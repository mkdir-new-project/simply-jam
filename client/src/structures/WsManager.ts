import Logger from "../../../shared/structures/Logger";
import Message from "../../../shared/structures/Message";


class WsManager extends EventTarget {

    ws: null | WebSocket;
    lt: number;

    constructor() {
        super();

        this.ws = null;
        this.lt = Date.now();
    }

    private wsHandshake() {
        this.ws?.send(
            new Message({ type: Message.types.CONNECT }).encode()
        )
    }

    connect() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const hostname = window.location.hostname === 'localhost' ? 'localhost:3000' : 'simplyjam.itsananth.repl.co';

        this.ws = new WebSocket(`${protocol}://${hostname}`);


        this.ws.binaryType = 'arraybuffer';
        this.ws.addEventListener('open', this.onOpen.bind(this));
        this.ws.addEventListener('error', this.onError.bind(this));
        this.ws.addEventListener('close', this.onClose.bind(this));
        this.ws.addEventListener('message', this.onMessage.bind(this))
    }

    send(data: Message | Buffer) {
        let message: Buffer;
        if (data instanceof Message) {
            message = data.encode();
        } else
            message = data;

        this.ws?.send(message);
    }

    private onOpen() {
        Logger.logc('blue', 'WS_OPEN');
        this.wsHandshake();
    }

    private onClose() {
        Logger.logc('blue', 'WS_CLOSE', 'websocket connection terminated');
    }

    private onError(e: Event) {
        Logger.logc('red', 'WS_ERROR', e);
    }

    private onMessage(event: MessageEvent<any>) {
        const message = Message.inflate(event.data);

        Logger.logc('yellow', 'WS_MESSAGE', message);

        if (!message) return;


        this.dispatchEvent(new CustomEvent(Message.types[message.type], { detail: message.data }))
    }

}

export default WsManager;