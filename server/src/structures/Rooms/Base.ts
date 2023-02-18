import User from "../Users/User";
import RoomTypes from "./RoomTypes";

abstract class BaseRoom {
    abstract roomId: string;
    abstract users: Map<string, User>
    abstract roomType: RoomTypes.PARTY|RoomTypes.RADIO;

    // abstract getUsers: () => void;
}

export default BaseRoom;