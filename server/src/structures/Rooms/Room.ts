import Utils from "../../utils/Utils";
import Music from "../Music/Music";
import User from "../Users/User";
import BaseRoom from "./Base";
import RoomTypes from "./RoomTypes";

class Room implements BaseRoom {
    users: Map<string, User>;
    currentTrack: Music|null;
    roomId: string;
    trackQueue: string[];
    roomType: RoomTypes.PARTY;

    constructor() {
        this.users = new Map();
        this.currentTrack = null;
        this.roomId = Utils.getId('r_', 4);
        this.trackQueue = [];
        this.roomType = RoomTypes.PARTY;
    }
};

export default Room;

