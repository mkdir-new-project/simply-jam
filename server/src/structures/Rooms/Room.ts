import Utils from "../../utils/Utils";
import Music from "../Music/Music";
import User from "../Users/User";

class Room {
    users: Map<string, User>;
    currentTrack: Music|null;
    roomId: string;

    constructor() {
        this.users = new Map();
        this.currentTrack = null;
        this.roomId = Utils.getId('r_', 4);
    }
};

export default Room;

