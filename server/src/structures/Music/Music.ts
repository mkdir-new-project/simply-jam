import internal from "stream";
import ytdl from "ytdl-core";
import Utils from "../../utils/Utils";

class Music {
    source: string;
    startTime: number;
    details: ytdl.MoreVideoDetails;


    constructor(url: string, details: ytdl.MoreVideoDetails) {
        this.source = url;
        this.startTime = Date.now();
        this.details = details;
    }


    serialize() {
        const millis = Date.now() - this.startTime;
        return { trackId: this.details.videoId, seek: Math.floor(millis / 1000) };
    }

    // async getBuffer(): Buffer {
    //     try {
    //         this.buffer = await Utils.streamToBuffer(this.readableStream);
    //     } catch (e) {
    //         Utils.logger.error(e);
    //         this.buffer = null;
    //     }

    //     return this.buffer;
    // }

    // private async getReadableStream(url: string) {
    //     const data = ytdl(url);

    //     this.readableStream = data;


    // }
}

export default Music;