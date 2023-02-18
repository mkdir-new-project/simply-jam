import { useEffect, useRef, useState } from 'react'
import Logger from '../../shared/structures/Logger';
import Message, { DataTypes, MessageTypes } from "../../shared/structures/Message";
import WsManager from './structures/WsManager';
import '../public/global.css'

import { AppShell } from './components/AppShell';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { isCustomEvent } from './utils';
import { Radio } from './pages/Radio/Radio';

declare global {
	interface Window {
		frameId: number;
	}
}

function App() {





	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='*' element={<Radio />} />
				</Routes>
			</BrowserRouter>
		</>
		// <AppShell />
		// <>
		// 	<div className="container">
		// 		<div className="overlay">
		// 			<div className='controls'>
		// 				<div className="trackTitle" ref={title}>Loading</div>
		// 				<progress className='progressbar' ref={progress} value={0} max={1000}></progress>
		// 			</div>
		// 		</div>
		// 		<canvas id='canvas' ref={canvas}></canvas>
		// 	</div>

		// </>
	)
}


export default App
