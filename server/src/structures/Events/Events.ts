import MessageTypes from "../Message/MessageType";
import EventTypes from "./EventTypes";

abstract class Events {
    abstract eventType: EventTypes;
    abstract messageType: MessageTypes;

    abstract callback: (...args: any[]) => void;
}

export default Events;