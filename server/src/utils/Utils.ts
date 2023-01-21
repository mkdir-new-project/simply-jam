import { randomBytes, createHash } from "crypto"
import { Stream } from "stream";
import Logger from "../../../shared/structures/Logger";


class Utils {

    static logger = Logger;

    static getId(prefix: string = '', size: number = 8) {
        return `${prefix}${createHash('sha256').update(Date.now().toString()).digest('hex').slice(0, size)}`;
    }

    static getByteId(prefix: string = '', bytes: number = 8) {
        return `${prefix}${randomBytes(bytes) .toString('hex')}`;
    }

    static streamToBuffer(stream: Stream): Promise<Buffer> {
        const buffer = Array<any>();
        return new Promise((res, rej) => {
            stream.on('data', chunk => {
                // console.log('s2b ->', chunk)
                buffer.push(chunk)
            });
            stream.on('end', () => {
                const buf = Buffer.concat(buffer);
                console.log(buf);
                res(buf);
            });
            stream.on('error', e => rej(e));
        })
    }
}

export default Utils;