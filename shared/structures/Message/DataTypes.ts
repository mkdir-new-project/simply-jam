import Music from "../../../server/src/structures/Music/Music";
import RadioRoom from '../../../server/src/structures/Rooms/RadioRoom';

export namespace DataTypes {
    export namespace Server {
        export type CONNECT = [{ success: boolean, username?: string }];
        export type NEW_TRACK = [{ trackId: string, seek: number }];
        export type RADIO_NEW_TRACK = [ReturnType<Music['serialize']>];
        export type RADIO_GET_TRACK_SEEK = [ReturnType<Music['serialize']>];
        export type RADIO_JOIN_ROOM = [ReturnType<RadioRoom['serialize']>];




    }

    export namespace Client {
        export type CONNECT = [{ username: string }];
        export type NEW_TRACK = [{ trackId: string }];
        export type RADIO_NEW_TRACK = [];
        export type RADIO_GET_TRACK_SEEK = [];
        export type RADIO_JOIN_ROOM = [{ roomId: string }]
    }
}
