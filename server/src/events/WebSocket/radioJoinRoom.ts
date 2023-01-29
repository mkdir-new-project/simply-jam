import WsEvent from "../../structures/Events/WsEvent";
import Message from "../../../../shared/structures/Message";
import WsServer from "../../structures/WsServer";
import Logger from "../../../../shared/structures/Logger";
import RoomTypes from "../../structures/Rooms/RoomTypes";
import RadioRoom from "../../structures/Rooms/RadioRoom";
import { Console } from "console";

export default new WsEvent({
    messageType: Message.types.RADIO_JOIN_ROOM,
    async callback(this: WsServer, connection, _message){
        console.log('aaa')

        const user = this.users.get(connection.id);

        const room = this.rooms.get(`radio_1234`);

        if (user.roomId != null || !room) return;
        if (room.roomType !== RoomTypes.RADIO) return;

        user.roomId = room.roomId;
        room.users.set(user.userId, user);


        connection.send(
            new Message({
                type: Message.types.RADIO_JOIN_ROOM
            }).encode()
        )
        // (room as RadioRoom).getCurrentTrack(user);

    },
})