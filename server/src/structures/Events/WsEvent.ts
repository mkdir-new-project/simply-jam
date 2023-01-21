import Events from "./Events";
import EventTypes from "./EventTypes";
import { connection } from 'websocket';
import Message, { MessageTypes } from "../../../../shared/structures/Message";


interface Arguments {
    messageType: MessageTypes;
    callback: (ws: connection, message: Message) => Promise<any>;
}

class WsEvent extends Events {
    
    eventType: EventTypes.WEBSOCKET;
    messageType: MessageTypes;
    callback: Arguments['callback'];

    constructor({ messageType, callback }: Arguments) {
        super();
        this.eventType = EventTypes.WEBSOCKET;
        this.messageType = messageType;
        this.callback = callback;
    }

}

export default WsEvent;