import WsServer from "./structures/WsServer";
import { createServer } from "http";
import Logger from "../../shared/structures/Logger";
import colors from 'colors';
import HttpServer from "./structures/HttpServer";
import RadioRoom from "./structures/Rooms/RadioRoom";
import Music from "./structures/Music/Music";
import ytdl from "ytdl-core";

declare module 'websocket' {
    interface connection {
        id: string;
    }
}

// main file for server

Logger.DEV = true;


// create http server to handle http requests
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const httpserver = new HttpServer(PORT);

httpserver.init();
httpserver.start();

// ws server, custom build i'll show how that works now


(async function () {
    const server = new WsServer(httpserver.server);

    const radioRoom = new RadioRoom();
    let elapsed = 0;
    radioRoom.roomId = 'radio_1234';
    const tracks = ['8EGliGWfuNI', 'AXbbTtf-miY'];

    for (let i = 0; i < tracks.length; i++) {
        const x = tracks[i];
        const url = `https://youtube.com/watch?v=${x}`;
        const data = await ytdl.getInfo(url);
        const music = new Music(url, data.videoDetails);
        music.startTime += elapsed;
        elapsed += (parseInt(music.details.lengthSeconds) * 1000);
        radioRoom.trackQueue.push(music);

        console.log(new Date(music.startTime).toLocaleString())
    }

    server.rooms.set(radioRoom.roomId, radioRoom)
    
    server.init();
    server.start();

})()

function convertTime(time: number) {
    let mins: string | number = Math.floor(time / 60);
    if (mins < 10)
        mins = '0' + String(mins);

    let secs: string | number = Math.floor(time % 60);
    if (secs < 10)
        secs = '0' + String(secs);


    return `${mins}:${secs}`;
}
