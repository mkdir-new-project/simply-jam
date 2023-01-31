import { useEffect, useRef, useState } from 'react'
import Logger from '../../shared/structures/Logger';
import Message, { DataTypes, MessageTypes } from "../../shared/structures/Message";
import WsManager from './structures/WsManager';
import '../public/global.css'

import { AppShell } from './components/AppShell';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { isCustomEvent } from './utils';
import Radio from './components/Radio/Radio';

declare global {
	interface Window {
		frameId: number;
	}
}

function App() {

	const canvas = useRef<HTMLCanvasElement>(null);
	const progress = useRef<HTMLProgressElement>(null);
	const title = useRef<HTMLDivElement>(null);
	const wsm = new WsManager();
	const audio = new Audio();
	let radio: Radio;

	if (true) {
		// @ts-ignore
		window.audio = audio;
		Logger.DEV = true;
	}



	useEffect(() => {
		if (!(canvas.current && progress.current)) return;
		canvas.current.width = window.innerWidth;
		canvas.current.height = window.innerHeight;

		radio = new Radio(wsm, canvas.current as HTMLCanvasElement, progress.current as HTMLProgressElement, title.current as HTMLDivElement);
		radio.attachEventListeners();

		wsm.addEventListener(Message.types[Message.types.CONNECT], (ev: Event) => {
			if (!isCustomEvent(ev)) return;

			radio.connectToStream();


		});


	}, [canvas, progress, title]);

	wsm.connect();




	return (
		<>
			<div className="container">
				<div className="overlay">
					<div className='controls'>
						<div className="trackTitle" ref={title}>Loading</div>
						<progress className='progressbar' ref={progress} value={0} max={1000}></progress>
					</div>
				</div>
				<canvas id='canvas' ref={canvas}></canvas>
			</div>

		</>
	)
}


export default App
