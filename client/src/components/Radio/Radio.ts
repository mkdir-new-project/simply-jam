import Logger from "../../../../shared/structures/Logger";
import Message, { DataTypes } from "../../../../shared/structures/Message";
import WsManager from "../../structures/WsManager";
import { isCustomEvent } from "../../utils";
import AnimationFrame from "../AnimationFrame/AnimationFrame";
import Visualizer from "../Visualizer/Visualizer";


class Radio {
    audio: HTMLAudioElement;
    private _audioResolving: boolean;
    private _socket: WsManager;
    private frame: AnimationFrame|null;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(wsm: WsManager, canvas: HTMLCanvasElement) {
        this._socket = wsm;
        this._audioResolving = false;
        this.audio = new Audio();
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.frame = null;


        this.audio.onerror = Logger.error;
    }

    start() {
        if (this._audioResolving) return;




        this._socket.addEventListener(Message.types[Message.types.NEW_TRACK], async (ev: Event) => {

            if (!isCustomEvent(ev)) return;

            const data: DataTypes.Server.NEW_TRACK = ev.detail;

            this.audio.crossOrigin = 'anonymous';
            this.audio.src = `${this._socket.httpprotocol}://${this._socket.host}/audio?trackId=${data[0].trackId}`;

            this._audioResolving = await this.loadAudio();
        });


        this._socket.addEventListener(Message.types[Message.types.GET_TRACK_SEEK], (ev: any) => {
			
            if (this._audioResolving) return Logger.logc('red', 'AUDIO_LOADER_ERROR', 'Attempted seek before loadeddata');
            
            const ping = this._socket.getPing();
			Logger.logc('purple', 'WS_LATENCY', ping * 1000 + ' ms');
			Logger.logc('purple', 'AUDIO_SEEK', ev.detail[0].seek + ping);

			this.audio.currentTime = ev.detail[0].seek + ping;

			this.audio.play();
            this.frame?.start();


		});

        this._socket.send(
            new Message({
                type: Message.types.CREATE_ROOM
            })
        )

        this._socket.send(
            new Message<DataTypes.Client.NEW_TRACK>({
                type: Message.types.NEW_TRACK,
                data: [{ trackId: 'TFZE4yY7hrc' }]
            })
        );
    }

    loadAudio(): Promise<boolean> {
        const _this = this;
        this._audioResolving = true;
        return new Promise((resolve, reject) => {
            this.audio.load();

            const visualizer = new Visualizer(this.audio, this.canvas);

            visualizer.connect();


            this.frame = new AnimationFrame(60, visualizer.render.bind(visualizer, this.start.bind(_this) as any), [() => {}, clear]);


            this.audio.addEventListener('loadeddata', () => {

                Logger.logc('lightgreen', 'AUDIO_LOADER', 'resolved audio');

                this._socket.send(new Message({
                    type: Message.types.GET_TRACK_SEEK,
                }))



                if (!this.frame) return Logger.error('no audio frame');

                this.frame.stop();

                resolve(false);
            })


            function clear() {
                visualizer.ctx.clearRect(0, 0, visualizer.width, visualizer.height);
            }

            // const frame = new AnimationFrame(60, visualizer.render)
        })

    }

}

export default Radio;