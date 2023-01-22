import ytdl from "ytdl-core";
import HttpEvent from "../../structures/Events/HttpEvent";
import duration from 'get-audio-duration';
import fs from 'fs';
import internal from "stream";


export default new HttpEvent({
    route: '/audio',
    async callback(req, res) {
        const url = new URL(req.url, `https://${req.headers.host}`);
        const trackId = url.searchParams.get('trackId');

        let start, end;
        let total: number;


        if (!trackId) return;
        const track = ytdl(`https://youtube.com/watch?v=${trackId}`, { filter: 'audioonly' });
        total = await getLen(track) as number;


        let range = req.headers.range;
        if (range) {
            let positions = range.replace(/bytes=/, "").split("-");
            start = parseInt(positions[0], 10);
            end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        } else {
            start = 0;
            end = total - 1;
        }
        let chunksize = (end - start) + 1;

        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, GET',
            'Access-Control-Max-Age': 2592000,
            'Content-Type': 'audio/mp3',
            "Content-Length": chunksize,
            "Accept-Ranges": "bytes",
            "Content-Range": "bytes " + start + "-" + end + "/" + total,
            'Content-Disposition': `attachment;\ filename="${trackId}.mp3`

        };

        console.log(headers);

        for (const [k, v] of Object.entries(headers))
            res.setHeader(k, v);


        track.pipe(res);


    }
})

function getLen(track: any) {
    return new Promise(res => {
        track.on('progress', (_: any, __: any, len: number) => res(len));
    })
}