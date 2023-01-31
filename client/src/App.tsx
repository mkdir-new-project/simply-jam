import { useEffect, useRef, useState } from 'react'
import Logger from '../../shared/structures/Logger';
import Message, { MessageTypes } from "../../shared/structures/Message";
import WsManager from './structures/WsManager';
import '../public/global.css'

import { AppShell } from './components/AppShell';

declare global {
	interface Window {
		frameId: number;
	}
}

function App() {

	const audioRef = useRef<HTMLAudioElement>(null);
	const wsm = new WsManager();
	const audio = new Audio();

	// @ts-ignore
	window.audio = audio;



	useEffect(() => {
		wsm.addEventListener(Message.types[Message.types.NEW_TRACK], (ev: any) => {

			audio.crossOrigin = 'anonymous';
			audio.src = `http://${'localhost:3000'}/audio?trackId=${ev.detail[0].trackId}`;

		})

		wsm.addEventListener(Message.types[Message.types.GET_TRACK_SEEK], (ev: any) => {
			const ping = (Date.now() - wsm.lt) / 1000;
			Logger.logc('purple', 'WS_LATENCY', ping * 1000 + ' ms');
			Logger.logc('purple', 'AUDIO_SEEK', ev.detail[0].seek + ping);

			audio.currentTime = ev.detail[0].seek + ping;

			audio.play();



		})

	}, [audioRef]);

	wsm.connect();




	return (
		<>
			<AppShell />{/* 
			<h1 className="text-3xl font-bold underline">
				Hello world!
			</h1>
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

				audio.addEventListener('loadeddata', () => {
					wsm.lt = Date.now();
					wsm.send(new Message({
						type: Message.types.GET_TRACK_SEEK,
					}))
				})
			}}>Play</button>
			<button onClick={() => {
				audio.volume = audio.volume != 0 ? 0 : 1;
			}}>mute</button>
			<audio ref={audioRef}></audio> */}

		</>
	)
}

function millisToMinutesAndSeconds(millis: number) {
	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	// @ts-ignore
	return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export default App
