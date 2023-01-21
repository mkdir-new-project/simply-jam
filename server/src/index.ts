import WsServer from "./structures/WsServer";
import { createServer } from "http";
import Logger from "./utils/Logger";
import colors from 'colors';

declare module 'websocket' {
    interface connection {
        id: string;
    }
}

// main file for server

Logger.DEV = true;


// create http server to handle http requests
const httpserver = createServer((_req, res) => {
    res.end('lmao');
})

httpserver.listen(3000);

// ws server, custom build i'll show how that works now
const server = new WsServer(httpserver);

server.init();
server.start();