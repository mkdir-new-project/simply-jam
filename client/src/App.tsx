import { useState } from 'react'
import Message from './structures/Message/Message';
import MessageTypes from './structures/Message/MessageType';
import WsManager from './structures/WsManager';

function App() {

	const wsm = new WsManager();

	wsm.connect();




	return (
		<>
			<div className="App">Hello World</div>
			<button onClick={() => wsm.ws?.close()}>disconnect</button>
			<button onClick={() => wsm.send(
				new Message({
					type: Message.types.GET_TRACK
				})
			)}>Get track data</button>

		</>
	)
}

export default App
