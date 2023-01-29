export namespace DataTypes {
    export namespace Server {
        export type CONNECT = [{ success: boolean, username?: string }];
        export type NEW_TRACK = [{ trackId: string, seek: number }];
        export type RADIO_NEW_TRACK = [{ trackId: string }];
        export type RADIO_GET_TRACK_SEEK = [{ trackId: string, seek: number }];



    }

    export namespace Client {
        export type CONNECT = [{ username: string }];
        export type NEW_TRACK = [{ trackId: string }];

    }
}
