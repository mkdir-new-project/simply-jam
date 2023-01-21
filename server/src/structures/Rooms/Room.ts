import Music from "../Music/Music";
import User from "../Users/User";

class Room {
    users: Map<string, User>;
    currentTrack: Music;
};

export default Room;

