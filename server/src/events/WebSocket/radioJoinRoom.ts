import WsEvent from "../../structures/Events/WsEvent";
import Message, { DataTypes } from "../../../../shared/structures/Message";
import WsServer from "../../structures/WsServer";
import RoomTypes from "../../structures/Rooms/RoomTypes";

export default new WsEvent<DataTypes.Client.RADIO_JOIN_ROOM>({
    messageType: Message.types.RADIO_JOIN_ROOM,
    async callback(this: WsServer, connection, _message){

        const user = this.users.get(connection.id);

        const room = this.rooms.get(`radio_1234`);

        if (user.roomId != null || !room) return;
        if (room.roomType !== RoomTypes.RADIO) return;
        
        user.roomId = room.roomId;
        room.users.set(user.userId, user);


        connection.send(
            new Message<DataTypes.Server.RADIO_JOIN_ROOM>({
                type: Message.types.RADIO_JOIN_ROOM,
                data: [room.serialize()]
            }).encode()
        )
        // (room as RadioRoom).getCurrentTrack(user);

    },
})