import Events from "./Events";
import EventTypes from "./EventTypes";
import { connection } from 'websocket';
import Message, { MessageTypes } from "../../../../shared/structures/Message";
import WsServer from "../WsServer";


interface Arguments {
    messageType: MessageTypes;
    callback: (this: WsServer, ws: connection, message: Message<any>) => Promise<any>;
}

class WsEvent<dataType extends Array<any> = any[]> extends Events {
    
    eventType: EventTypes.WEBSOCKET;
    messageType: MessageTypes;
    callback: (this: WsServer, ws: connection, message: Message<dataType>) => Promise<any>;

    constructor({ messageType, callback }: { messageType: MessageTypes, callback: (this: WsServer, ws: connection, message: Message<dataType>) => Promise<any> }) {
        super();
        this.eventType = EventTypes.WEBSOCKET;
        this.messageType = messageType;
        this.callback = callback;
    }

}

export default WsEvent;