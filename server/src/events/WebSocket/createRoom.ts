import WsEvent from "../../structures/Events/WsEvent";
import Message from "../../../../shared/structures/Message";
import WsServer from "../../structures/WsServer";
import Logger from "../../../../shared/structures/Logger";
import Room from "../../structures/Rooms/Room";

export default new WsEvent({
    messageType: Message.types.CREATE_ROOM,
    async callback(this: WsServer, connection, _message) {

        const user = this.users.get(connection.id);



        if (user.roomId != null) return;

        const newRoom = new Room();
        
        user.roomId = newRoom.roomId;
        newRoom.users.set(user.userId, user);
        this.rooms.set(newRoom.roomId, newRoom);

        Logger.log(this.rooms, this.users);

    },
})