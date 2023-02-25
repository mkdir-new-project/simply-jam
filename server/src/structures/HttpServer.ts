import fs from 'fs';
import { createServer } from 'http'
import type { Express } from 'express';
import Utils from "../utils/Utils";
import Logger from "../../../shared/structures/Logger";
import cors from 'cors';
import express from 'express';
import colors from 'colors/safe';
import HttpEvent from "./Events/HttpEvent";
import { httpTypeArray, HttpTypes } from '../../../shared/structures/HTTP';

class HttpServer {

    // this map consists of all the events located under /events folder
    // https reads the functions to execute on a specific message from here
    app: Express;
    events: Map<HttpTypes, Map<string, HttpEvent>>;
    server: ReturnType<typeof createServer>;
    PORT: number;

    constructor(PORT: number = 3000) {

        this.app = express();
        this.events = new Map();
        // this.server = createServer();

        this.PORT = PORT;

        for (let i = 0; i < httpTypeArray.length; i++)
            this.events.set(i, new Map());

    }

    async init() {

        // loading all events from /events into memory for dynamic execution
        const eventsPath = fs.readdirSync('./src/events/HTTP');

        if (eventsPath.length === 0) return console.log('empty server events');

        for (let i = 0; i < eventsPath.length; i++) {
            const event = (await import(`../events/HTTP/${eventsPath[i]}`)).default as HttpEvent;

            const eventType = this.events.get(event.method);

            if (eventType.has(event.route)) continue;

            eventType.set(event.route, event);
        }

        Logger.log(colors.blue('[HTTP_SERVER]'), this.events);

    }


    start() {

        for (const [method, event] of [...this.events.entries()]) {

            for (const [route, eventHandler] of [...event.entries()]) {

                const _method: 'get' | 'post' | 'put' | 'delete' = HttpTypes[method].toLowerCase() as any;

                this.app[_method](route, eventHandler.callback.bind(this));
            }

        }

        this.app.use(cors());

        this.server = createServer(this.app);


        // console.log(this.)
        // const _this = this;
        // this.server.on('request', (req, res) => {
        //     const method = req.method;
        //     const eventType = this.events.get(httpTypeArray.indexOf(method));
        //     const idx = req.url.indexOf('?');
        //     const url = req.url.slice(0, idx != -1 ? idx : req.url.length)

        //     const event = eventType.get(url);

        //     console.log(url)

        //     if (!event)
        //         res.end('Invalid route');
        //     else {
        //         event.callback.call(_this, req, res);
        //         Logger.log(colors.blue('[HTTP_CLIENT]'), `[${HttpTypes[event.method]}]`, `[${event.route}]`);
        //     }
        // })

        this.server.listen(this.PORT, () => Logger.log(colors.blue('[HTTP_SERVER]'), `Listening on port ${this.PORT}`));

    }
}

export default HttpServer;
