import WsEvent from "../../structures/Events/WsEvent";
import Message from "../../../../shared/structures/Message";
import Music from "../../structures/Music/Music";

export default new WsEvent({
    messageType: Message.types.GET_TRACK,
    callback: async(connection, _message) => {


        connection.send(
            new Message({
                type: Message.types.GET_TRACK,
                data: []
            }).encode()
        )
    },
})