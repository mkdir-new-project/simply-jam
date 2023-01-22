import ytdl from "ytdl-core";
import HttpEvent from "../../structures/Events/HttpEvent";

export default new HttpEvent({
    route: '/audio',
    async callback(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*'); /* @dev First, read about security */
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
        const url = new URL(req.url, `https://${req.headers.host}`);
        const trackId = url.searchParams.get('trackId');

        console.log(trackId)

        if (!trackId) return;


        console.log(`https://youtube.com/watch?v=${trackId}`)
        res.setHeader('Content-Disposition', `attachment;\ filename="${trackId}.mp3"`)
        ytdl(`https://youtube.com/watch?v=${trackId}`, { filter: 'audioonly' }).pipe(res);

        // res.end('done')

    }
})