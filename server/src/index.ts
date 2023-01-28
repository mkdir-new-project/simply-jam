import WsServer from "./structures/WsServer";
import { createServer } from "http";
import Logger from "../../shared/structures/Logger";
import colors from 'colors';
import HttpServer from "./structures/HttpServer";

declare module 'websocket' {
    interface connection {
        id: string;
    }
}

// main file for server

Logger.DEV = true;


// create http server to handle http requests
const httpserver = new HttpServer(process.env.PORT ? parseInt(process.env.PORT) || 3000);

httpserver.init();
httpserver.start();

// ws server, custom build i'll show how that works now
const server = new WsServer(httpserver.server);

server.init();
server.start();
