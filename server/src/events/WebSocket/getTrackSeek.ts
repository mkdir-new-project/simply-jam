import WsEvent from "../../structures/Events/WsEvent";
import Message from "../../../../shared/structures/Message";
import Music from "../../structures/Music/Music";

export default new WsEvent({
    messageType: Message.types.GET_TRACK_SEEK,
    async callback(connection, _message) {


        const user = this.users.get(connection.id);
        const roomId = user.roomId;

        if (!roomId) return;

        const room = this.rooms.get(roomId);

        connection.send(new Message({
            type: Message.types.GET_TRACK_SEEK,
            data: [room.currentTrack.serialize()]
        }).encode())
    },
})