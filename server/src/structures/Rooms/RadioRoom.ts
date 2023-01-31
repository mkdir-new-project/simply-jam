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

    constructor() {
        this.users = new Map();
        this.currentTrack = 0;
        this.roomId = Utils.getId('radio_', 4);
        this.trackQueue = [];
        this.startTime = Date.now();
        this.roomType = RoomTypes.RADIO;
        this.timer = false;
        this.requestQueue = [];
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


            // if (t.startTime > now) continue;
            console.log(dt, dn);
            if (dt > dn) continue;
            // if (dt.getSeconds() > dn.getSeconds()) continue;

            const serialized = t.serialize();
            const duration = parseInt(t.details.lengthSeconds);
            const seek = serialized.seek;//Math.max(0, serialized.seek);
            const diff = duration - seek;
            index = i;//(serialized.seek >= duration) ? i + 1 : i;
            Logger.log(t.details.title, seek, duration, diff)
            
            if (diff > 0 && diff < 3)  {
                await wait(diff * 1000);
                index++;
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


    // getCurrentTrack(user: User) {
    //     const track = this.trackQueue[this.currentTrack];
    //     const diff = (Date.now() - track.startTime);
    //     const videoLenMs = (parseInt(track.details.lengthSeconds) * 1000);

    //     console.log(diff, videoLenMs)
    //     if (diff < videoLenMs) {

    //                     // if (this.timer) return;

    //         // this.timer = true;

    //         // setTimeout(() => {


    //         user.connection.send(
    //             new Message<DataTypes.Server.RADIO_NEW_TRACK>({
    //                 type: Message.types.RADIO_NEW_TRACK,
    //                 data: [this.trackQueue[this.currentTrack].serialize()]
    //             }).encode()
    //         )


    //     } else {
    //         this.requestQueue.push(user);


    //         this.timer = false;
    //         this.currentTrack++;
    //         this.trackQueue[this.currentTrack].startTime = Date.now();
    //         this.requestQueue.forEach(user => {
    //             user.connection.send(
    //                 new Message<DataTypes.Server.RADIO_NEW_TRACK>({
    //                     type: Message.types.RADIO_NEW_TRACK,
    //                     data: [this.trackQueue[this.currentTrack].serialize()]
    //                 }).encode()
    //             )
    //         })
    //         // }, diff);


    //     }
    // }
}

export default RadioRoom;