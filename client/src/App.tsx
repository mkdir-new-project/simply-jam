import { useEffect, useRef, useState } from 'react'
import Message, { MessageTypes } from "../../shared/structures/Message";
import WsManager from './structures/WsManager';

function App() {

	const audioRef = useRef<HTMLAudioElement>(null);
	const wsm = new WsManager();

	useEffect(() => {

	}, [audioRef]);
	
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
			<button onClick={() => wsm.send(
				new Message({
					type: Message.types.CREATE_ROOM
				})
			)}>Create Room</button>
			<audio ref={audioRef}></audio>

		</>
	)
}

export default App
