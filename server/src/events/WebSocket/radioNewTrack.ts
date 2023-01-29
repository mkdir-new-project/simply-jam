import WsEvent from "../../structures/Events/WsEvent";
import Message, { DataTypes, MessageTypes } from "../../../../shared/structures/Message";
import Music from "../../structures/Music/Music";
import ytdl from "ytdl-core";
import RadioRoom from "../../structures/Rooms/RadioRoom";
import RoomTypes from "../../structures/Rooms/RoomTypes";

export default new WsEvent({
    messageType: Message.types.RADIO_NEW_TRACK,
    async callback(connection, _message: Message<DataTypes.Client.NEW_TRACK>) {


        const user = this.users.get(connection.id);
        const roomId = user.roomId;

        if (!roomId) return;

        const room = this.rooms.get(roomId);
        if (room.roomType !== RoomTypes.RADIO) return;

        (room as RadioRoom).getCurrentTrack(user);

    },
})