import { emit } from "process";
import Logger from "../../../../shared/structures/Logger";
import Message, { DataTypes } from "../../../../shared/structures/Message";
import WsManager from "../../structures/WsManager";
import { isCustomEvent } from "../../utils";
import AnimationFrame from "../AnimationFrame/AnimationFrame";
import Visualizer from "../Visualizer/Visualizer";


class Radio extends EventTarget {
    audio: HTMLAudioElement;
    private _audioResolving: boolean;
    private _socket: WsManager;
    private _lastTrackTime: number;
    frame: AnimationFrame | null;
    _playing: boolean;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    progress: HTMLProgressElement;
    title: HTMLDivElement;
    visualizer: Visualizer | null;

    constructor(wsm: WsManager, canvas: HTMLCanvasElement, progress: HTMLProgressElement, title: HTMLDivElement) {
        super();
        this._socket = wsm;
        this._audioResolving = false;
        this._playing = false;
        this.progress = progress;
        this.audio = new Audio();
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.frame = null;
        this._lastTrackTime = Date.now();
        this.title = title;
        this.visualizer = null;

        this.audio.onerror = Logger.error;
    }

    connectToStream() {
        this._socket.send(
            new Message({
                type: Message.types.RADIO_JOIN_ROOM
            })
        )
    }

    requestNewTrack() {

        Logger.log('requesting new song')
        this._socket.send(
            new Message({
                type: Message.types.RADIO_NEW_TRACK,
            })
        );
    }

    flushAudioElement() {

        this._createAudioElement();

    }

    start(isInitialStart = true) {
        this.frame?.stop();
        
        if (!isInitialStart) this.progress.value = 1000;
        
        if (this._audioResolving) return Logger.logc('red', 'RADIO_ERROR', 'cannot audio resolving');;

        if (this._playing) return Logger.logc('red', 'RADIO_ERROR', 'cannot audio already playing');

        this._createAudioElement();

        this.requestNewTrack();

    }

    attachEventListeners() {
        this._socket.addEventListener(Message.types[Message.types.RADIO_BROADCAST_FINISH], async (ev: Event) => {

            if (!isCustomEvent(ev)) return;

            if (this._audioResolving) return Logger.logc('red', 'AUDIO_LOADER_ERROR', 'Attempted loading before resolving');
            if (this._playing) return Logger.logc('red', 'AUDIO_PLAYBACK', 'audio already playing cannot load');


            const data: any = ev.detail;

            this.visualizer?.disconnect();
            this.frame?.stop();

            this.title.innerText = 'Radio Broadcast Finished';

        });

        this._socket.addEventListener(Message.types[Message.types.RADIO_NEW_TRACK], async (ev: Event) => {

            if (!isCustomEvent(ev)) return;

            if (this._audioResolving) return Logger.logc('red', 'AUDIO_LOADER_ERROR', 'Attempted loading before resolving');
            if (this._playing) return Logger.logc('red', 'AUDIO_PLAYBACK', 'audio already playing cannot load');


            const data: DataTypes.Server.RADIO_NEW_TRACK = ev.detail;

            this.audio.src = `${this._socket.httpprotocol}://${this._socket.host}/audio?trackId=${data[0].trackId}`;

            this._lastTrackTime = Date.now();
            this.title.innerText = data[0].title;
            this._audioResolving = await this._loadAudio();
        });

        this._socket.addEventListener(Message.types[Message.types.RADIO_JOIN_ROOM], async (ev: Event) => {

            if (!isCustomEvent(ev)) return;

            if (this._audioResolving) return Logger.logc('red', 'AUDIO_LOADER_ERROR', 'Attempted loading before resolving');
            if (this._playing) return Logger.logc('red', 'AUDIO_PLAYBACK', 'audio already playing cannot load');

            Logger.logc('lightyellow', 'RADIO', 'Joined radio lobby');

            this.start();

        });


        this._socket.addEventListener(Message.types[Message.types.RADIO_GET_TRACK_SEEK], (ev: any) => {

            if (!isCustomEvent(ev)) return;
            if (this._audioResolving) return Logger.logc('red', 'AUDIO_LOADER_ERROR', 'Attempted seek before loadeddata');
            if (this._playing) return Logger.logc('red', 'AUDIO_PLAYBACK', 'audio already playing');
            const ping = this._socket.getPing();
            const data: DataTypes.Server.RADIO_GET_TRACK_SEEK = ev.detail;
            const seek = data[0].seek;

            Logger.logc('purple', 'WS_LATENCY', ping * 1000 + ' ms');
            Logger.logc('purple', 'AUDIO_SEEK', seek + ping, 'audio seek corrected');

            this.audio.currentTime = Math.max(seek + ping, 0);

            this.audio.play();
            this.frame?.start();
        });

    }

    private _createAudioElement() {
        this.audio = new Audio();
        this.audio.crossOrigin = 'anonymous';

        this.audio.addEventListener('timeupdate', () => {
            const percent = Math.floor((this.audio.currentTime / this.audio.duration) * 1000);
            this.progress.value = percent === Infinity ? 0 : percent;
        })

        this.audio.addEventListener('ended', (ev: Event) => {
            console.log('ended');
            this.visualizer?.disconnect();
            this._playing = false;

            Logger.logc('lightblue', 'VISUALIZER', 'playback finished');

            this.start(false)

            // this.frame?.stop();
        })
    }

    private _loadAudio(): Promise<boolean> {
        const _this = this;
        this._audioResolving = true;
        if (this.frame) this.frame.stop();


        return new Promise((resolve, reject) => {
            this.audio.load();

            const visualizer = new Visualizer(this.audio, this.canvas);
            this.visualizer = visualizer;

            visualizer.connect();


            this.frame = new AnimationFrame(60, visualizer.render.bind(visualizer, this.start.bind(_this) as any, _this));

            this.audio.addEventListener('loadeddata', () => {

                Logger.logc('lightgreen', 'AUDIO_LOADER', 'resolved audio');

                this._socket.send(new Message({
                    type: Message.types.RADIO_GET_TRACK_SEEK
                }))





                resolve(false);
            })
        })

    }

}

export default Radio;