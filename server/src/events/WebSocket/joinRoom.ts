import WsEvent from "../../structures/Events/WsEvent";
import Message from "../../../../shared/structures/Message";
import WsServer from "../../structures/WsServer";
import Logger from "../../../../shared/structures/Logger";
import RoomTypes from "../../structures/Rooms/RoomTypes";

export default new WsEvent({
    messageType: Message.types.JOIN_ROOM,
    async callback(this: WsServer, connection, message){

        const user = this.users.get(connection.id);
        const roomId = message.data[0];

        const room = this.rooms.get(`r_${roomId}`);

        console.log('join room', room)

        if (user.roomId != null || !room) return;
        if (room.roomType == RoomTypes.RADIO) return;

        user.roomId = room.roomId;
        room.users.set(user.userId, user);


        connection.send(new Message({
            type: Message.types.NEW_TRACK,
            data: [room.currentTrack.serialize()]
        }).encode())

    },
})