import WsEvent from "../../structures/Events/WsEvent";
import Message from "../../../../shared/structures/Message";
import Music from "../../structures/Music/Music";
import RoomTypes from "../../structures/Rooms/RoomTypes";
import RadioRoom from "../../structures/Rooms/RadioRoom";

export default new WsEvent({
    messageType: Message.types.RADIO_GET_TRACK_SEEK,
    async callback(connection, _message) {


        const user = this.users.get(connection.id);
        const roomId = user.roomId;

        if (!roomId) return;

        const room = this.rooms.get(roomId);
        
        if (room.roomType === RoomTypes.PARTY) return;


        (room as RadioRoom).getTrackSeek(user);
    },
})