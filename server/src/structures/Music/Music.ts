import internal from "stream";
import ytdl from "ytdl-core";
import Utils from "../../utils/Utils";

class Music {
    source: string;
    startTime: number;
    readableStream: internal.Readable|null;
    seekLength: number;
    

    constructor(url: string) {
        this.source = url;
        this.startTime = Date.now();
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