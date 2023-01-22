import ytdl from "ytdl-core";
import HttpEvent from "../../structures/Events/HttpEvent";

/**
 * DEV note
 * 
 * headers requires content range and content length to seek audio
 */

export default new HttpEvent({
    route: '/player',
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
            'cache': 'no-cache',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, GET',
            'Access-Control-Max-Age': 2592000,
            'Content-Type': 'audio/mp3',
            "Content-Length": chunksize,
            "Accept-Ranges": "bytes",
            "Content-Range": "bytes " + start + "-" + end + "/" + total,

        };

        res.writeHead(206, headers);



        track.pipe(res);


    }
})

function getLen(track: any) {
    return new Promise(res => {
        track.on('progress', (_: any, __: any, len: number) => res(len));
    })
}