import Events from "./Events";
import EventTypes from "./EventTypes";
import HttpServer from "../HttpServer";
import type { RequestListener, IncomingMessage, ServerResponse } from 'http';
import { HttpTypes } from "../../../../shared/structures/HTTP";


interface Arguments {
    route: string;
    method?: HttpTypes;
    callback: (this: HttpServer, ...args: Parameters<RequestListener<typeof IncomingMessage, typeof ServerResponse>>) => Promise<any>;
}

class HttpEvent extends Events {
    
    route: string;
    method: HttpTypes;
    eventType: EventTypes.HTTP;
    callback: Arguments['callback'];

    constructor({ route, callback, method }: Arguments) {
        super();
        this.method = method ?? HttpTypes.GET;
        this.route = route;
        this.eventType = EventTypes.HTTP;
        this.callback = callback;
    }

}

export default HttpEvent;
