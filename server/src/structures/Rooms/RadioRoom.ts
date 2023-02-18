import Logger from "../../../../shared/structures/Logger";
import Message, { DataTypes } from "../../../../shared/structures/Message";
import Utils from "../../utils/Utils";
import Music from "../Music/Music";
import User from "../Users/User";
import BaseRoom from "./Base";
import RoomTypes from "./RoomTypes";

function wait(ms: number) {
    return new Promise(res => {
        setTimeout(res, ms);
    })
}

class RadioRoom implements BaseRoom {
    users: Map<string, User>;
    currentTrack: number;
    roomId: string;
    startTime: number;
    trackQueue: Music[];
    requestQueue: User[];
    timer: boolean;
    roomType: RoomTypes.RADIO;
    bufferPadding: number;

    constructor() {
        this.users = new Map();
        this.currentTrack = 0;
        this.roomId = Utils.getId('radio_', 4);
        this.trackQueue = [];
        this.startTime = Date.now();
        this.roomType = RoomTypes.RADIO;
        this.timer = false;
        this.requestQueue = [];
        this.bufferPadding = 3;

    }

    serialize() {
        return { roomId: this.roomId, userCount: this.users.size };
    }

    broadcast(message: Message|Buffer) {
        const msg = message instanceof Buffer ? message : message.encode();
        const users = [...this.users.values()];

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            user.connection.send(msg);
        };
    }

    getTrackSeek(user: User) {


        const t = this.trackQueue[user.index];

        user.connection.send(
            new Message({
                type: Message.types.RADIO_GET_TRACK_SEEK,
                data: [{ ...t.serialize() }]

            }).encode()
        )


    }

    async getCurrentTrack(user: User) {
        let now = Date.now();
        const dn = Math.floor(now / 1000); //new Date(now);
        let index;
        for (let i = this.trackQueue.length - 1; i >= 0; i--) {
            now = Date.now();
            const t = this.trackQueue[i];
            const dt = Math.floor(t.startTime / 1000); //new Date(t.startTime);


            console.log(dt, dn);
            if (dt > dn) continue;





            const serialized = t.serialize();
            const duration = parseInt(t.details.lengthSeconds);
            const seek = serialized.seek;
            let diff = duration - seek;
            index = i;
            Logger.log(t.details.title, seek, duration, diff, index)

            
            /**
             * if seek is less than song duration and there's only 3 seconds left to finish 
             * then send the next song 
             * because the song will end by the time it reaches the end user
             */
            if (diff >= 0 && diff < this.bufferPadding)  {
                // await wait((diff + 10) * 1000);
                Logger.log('waiting ' + diff * 1000 + ' ms');
                await wait(diff * 1000);
                index++;
            }



            /**
             * radio broadcast has already ended when index is higher than track queue or 
             * seek is negative
             */
            if (diff < 0 || index > this.trackQueue.length - 1) {
            
                user.connection.send(
                    new Message({
                        type: Message.types.RADIO_BROADCAST_FINISH
                    }).encode()
                )
                return;
            }

            user.index = index;

            user.connection.send(
                new Message({
                    type: Message.types.RADIO_NEW_TRACK,
                    data: [{ ...this.trackQueue[index].serialize() }]

                }).encode()
            )

            break;
        }
    }
}

export default RadioRoom;