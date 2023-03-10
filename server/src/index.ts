import WsServer from "./structures/WsServer";
import { createServer } from "http";
import Logger from "../../shared/structures/Logger";
import colors from 'colors';
import HttpServer from "./structures/HttpServer";
import RadioRoom from "./structures/Rooms/RadioRoom";
import Music from "./structures/Music/Music";
import ytdl from "ytdl-core";
import express from 'express';

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



// ws server, custom build i'll show how that works now


(async function () {
    await httpserver.init();
    httpserver.start();
    const server = new WsServer(httpserver.server);

    const radioRoom = new RadioRoom(3000);
    let elapsed = 0;
    radioRoom.roomId = 'radio_1234';
    const tracks = ['4gzIL8_G4Xs', 'AXbbTtf-miY', 'umqA5IMx_2I']//, ];

    for (let i = 0; i < tracks.length; i++) {
        const x = tracks[i];
        const url = `https://youtube.com/watch?v=${x}`;
        const data = await ytdl.getInfo(url);
        const music = new Music(url, data.videoDetails);
        const duration = (parseInt(music.details.lengthSeconds) * 1000);
        music.startTime += elapsed;

        elapsed += (duration + radioRoom.trackStartDelay);
        radioRoom.trackQueue.push(music);

        console.log(new Date(music.startTime).toLocaleString(), duration, radioRoom.trackStartDelay)
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
