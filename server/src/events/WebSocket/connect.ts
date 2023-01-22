import WsEvent from "../../structures/Events/WsEvent";
import Message from "../../../../shared/structures/Message";
import WsServer from "../../structures/WsServer";
import Logger from "../../../../shared/structures/Logger";

export default new WsEvent({
    messageType: Message.types.CONNECT,
    async callback(this: WsServer, connection, _message) {

        connection.send(new Message({
            type: Message.types.CONNECT,
            data: ['handshake confirmed']
        }).encode())

    },
})