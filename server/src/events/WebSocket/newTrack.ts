import WsEvent from "../../structures/Events/WsEvent";
import Message, { DataTypes, MessageTypes } from "../../../../shared/structures/Message";
import Music from "../../structures/Music/Music";

export default new WsEvent({
    messageType: Message.types.NEW_TRACK,
    async callback(connection, message: Message<DataTypes.Client.NEW_TRACK>) {

        const trackId = message.data[0].trackId;
        const user = this.users.get(connection.id);
        const roomId = user.roomId;

        if (!roomId) return;

        const room = this.rooms.get(roomId);
        // room.currentTrack = new Music(`https://youtube.com/watch?v=${trackId}`);
        room.currentTrack = new Music(trackId);

        const toSend = new Message<DataTypes.Server.NEW_TRACK>({
            type: MessageTypes.NEW_TRACK,
            data: [room.currentTrack.serialize()]
        })

        this.broadcastRoom(roomId, toSend)

    },
})