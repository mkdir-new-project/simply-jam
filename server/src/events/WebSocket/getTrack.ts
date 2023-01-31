import WsEvent from "../../structures/Events/WsEvent";
import Message from "../../../../shared/structures/Message";
import Music from "../../structures/Music/Music";
import RoomTypes from "../../structures/Rooms/RoomTypes";

export default new WsEvent({
    messageType: Message.types.GET_TRACK,
    async callback(connection, _message) {


        const user = this.users.get(connection.id);
        const roomId = user.roomId;

        if (!roomId) return;

        const room = this.rooms.get(roomId);

        if (room.roomType === RoomTypes.RADIO) return;


        connection.send(new Message({
            type: Message.types.GET_TRACK,
            data: [room.currentTrack.serialize()]
        }).encode())
    },
})