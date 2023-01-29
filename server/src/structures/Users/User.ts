import { connection } from "websocket";
import { randomBytes } from 'crypto';
import Utils from "../../utils/Utils";

class User {

    userId: string;
    roomId: null|string;
    connection: connection;
    isListening: boolean;
    index: number;

    constructor({ connection }: { connection: connection }) {
        this.connection = connection;
        this.userId = Utils.getId('u_');
        this.isListening = false;
        this.roomId = null;
        this.index = 0;
    }



    serialize() {
        return { userId: this.userId, isListening: this.isListening };
    }

}

export default User;