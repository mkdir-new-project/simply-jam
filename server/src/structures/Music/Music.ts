import ytdl from "ytdl-core";

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
        return { trackId: this.details.videoId, seek: Math.floor(millis / 1000), title: this.details.title };
    }
}

export default Music;