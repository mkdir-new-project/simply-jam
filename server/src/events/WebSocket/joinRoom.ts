import WsEvent from "../../structures/Events/WsEvent";
import Message from "../../../../shared/structures/Message";
import WsServer from "../../structures/WsServer";
import Logger from "../../../../shared/structures/Logger";

export default new WsEvent({
    messageType: Message.types.JOIN_ROOM,
    async callback(this: WsServer, connection, message){

        const user = this.users.get(connection.id);
        const roomId = message.data[0];

        const room = this.rooms.get(`r_${roomId}`);

        if (user.roomId != null || !room) return;

        user.roomId = roomId;
        room.users.set(user.userId, user);

    },
})