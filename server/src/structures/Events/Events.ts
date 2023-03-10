import { MessageTypes } from "../../../../shared/structures/Message";
import EventTypes from "./EventTypes";

abstract class Events {
    abstract eventType: EventTypes;
    abstract callback: (...args: any[]) => void;
}

export default Events;