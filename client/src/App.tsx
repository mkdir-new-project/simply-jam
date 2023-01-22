import { useEffect, useRef, useState } from 'react'
import Message, { MessageTypes } from "../../shared/structures/Message";
import WsManager from './structures/WsManager';

function App() {

	const audioRef = useRef<HTMLAudioElement>(null);
	const wsm = new WsManager();
	const audio = new Audio();



	useEffect(() => {
		wsm.addEventListener(Message.types[Message.types.NEW_TRACK], (ev: any) => {
			console.log('ev', ev.detail);

			audio.src = `http://localhost:3000/audio?trackId=${ev.detail[0].trackId}`;
			console.log(audio.src)
			audio.crossOrigin = 'anonymous';


		})

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
			<button onClick={() => wsm.send(
				new Message({
					type: Message.types.JOIN_ROOM,
					data: ['123']
				})
			)}>Join Room</button>

			<button onClick={() => wsm.send(
				new Message({
					type: Message.types.NEW_TRACK,
					data: ['64CnG-9oprM']
				})
			)}>set new track</button>
			<button onClick={() => {
				audio.load();
				audio.play();

				audio.addEventListener('loadeddata', () => console.log('loaded'))
			}}>Play</button>
			<audio ref={audioRef}></audio>

		</>
	)
}

export default App
