import WsEvent from "../../structures/Events/WsEvent";
import Message, { MessageTypes } from "../../../../shared/structures/Message";
import Music from "../../structures/Music/Music";

export default new WsEvent({
    messageType: Message.types.NEW_TRACK,
    async callback(connection, message) {

        const trackId = message.data[0];
        const user = this.users.get(connection.id);
        const roomId = user.roomId;

        if (!roomId) return;

        const room = this.rooms.get(roomId);
        // room.currentTrack = new Music(`https://youtube.com/watch?v=${trackId}`);
        room.currentTrack = new Music(trackId);


        this.broadcastRoom(roomId, new Message({
            type: MessageTypes.NEW_TRACK,
            data: [room.currentTrack.serialize()]
        }))

    },
})