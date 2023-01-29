import Message, { DataTypes } from "../../../../shared/structures/Message";
import Utils from "../../utils/Utils";
import Music from "../Music/Music";
import User from "../Users/User";
import BaseRoom from "./Base";
import RoomTypes from "./RoomTypes";

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

        console.log('seek', Date.now() - t.startTime / 1000)

        user.connection.send(
            new Message({
                type: Message.types.RADIO_GET_TRACK_SEEK,
                data: [{ ...t.serialize() }]

            }).encode()
        )


    }

    getCurrentTrack(user: User) {
        const now = Date.now();
        const dn = new Date(now);
        for (let i = this.trackQueue.length - 1; i >= 0; i--) {
            const t = this.trackQueue[i];
            const dt = new Date(t.startTime);


            // if (t.startTime > now) continue;
            if (dt.getSeconds() > dn.getSeconds()) continue;
            user.index = i;

            user.connection.send(
                new Message({
                    type: Message.types.RADIO_NEW_TRACK,
                    data: [{ ...t.serialize() }]

                }).encode()
            )
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