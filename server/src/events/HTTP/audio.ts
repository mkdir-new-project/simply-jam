import { IncomingMessage, ServerResponse } from "http";
import ytdl from "ytdl-core";
import Logger from "../../../../shared/structures/Logger";
import HttpEvent from "../../structures/Events/HttpEvent";
import rangeParser from 'range-parser';

/**
 * DEV note
 * 
 * headers requires content range and content length to seek audio
 */

export default new HttpEvent({
    route: '/audio',
    async callback(req, res) {
        
        const trackId = req.query.trackId;

        let start, end;
        let total: number;


        if (!trackId) return;

        const videoURL = `https://youtube.com/watch?v=${trackId}`;


        const track = ytdl(videoURL, { filter: (i) => i.itag == 251 });
        const info = await ytdl.getInfo(videoURL);
        total = parseInt(info.formats.find(x => x.itag == 251).contentLength);



        let range = req.headers.range;

        Logger.log('RANGE', req.headers.range)
        if (range) {
            let positions = range.replace(/bytes=/, "").split("-");
            start = parseInt(positions[0], 10);
            end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        } else {
            start = 0;
            end = total - 1;
        }
        let chunksize = (end - start) + 1;

        Logger.log('HTTP AUDIO', "bytes " + start + "-" + end + "/" + total);

        const headers = {
            'Content-Type': 'audio/webm',
            "Content-Length": chunksize,
            "Accept-Ranges": "bytes",
            "Content-Range": "bytes " + start + "-" + end + "/" + total,
            "Content-Transfer-Encoding": 'binary'
            // 'Content-Disposition': `attachment;\ filename="${trackId}.mp3`

        };

        res.writeHead(206, headers);

        track.pipe(res);






    }
})
