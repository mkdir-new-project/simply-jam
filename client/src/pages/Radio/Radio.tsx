import React, { useRef, useEffect, useState} from "react"
import Logger from "../../../../shared/structures/Logger";
import Message, { DataTypes } from "../../../../shared/structures/Message";
import RadioApp from "../../components/Radio/Radio";
import WsManager from "../../structures/WsManager";
import { isCustomEvent } from "../../utils";

export const Radio: React.FC = () => {

    const canvas = useRef<HTMLCanvasElement>(null);
    const progress = useRef<HTMLProgressElement>(null);
    const title = useRef<HTMLDivElement>(null);
    const userCountDiv = useRef<HTMLDivElement>(null);
    const [userCount, setUserCount] = useState<number>(0);
    const wsm = new WsManager();
    const audio = new Audio();
    let radio: RadioApp;

    if (true) {
        // @ts-ignore
        window.audio = audio;
        Logger.DEV = true;
    }



    useEffect(() => {
        if (!(canvas.current && progress.current)) return;
        canvas.current.width = window.innerWidth;
        canvas.current.height = window.innerHeight;

        radio = new RadioApp(wsm, canvas.current as HTMLCanvasElement, progress.current as HTMLProgressElement, title.current as HTMLDivElement);
        radio.attachEventListeners();

        wsm.addEventListener(Message.types[Message.types.CONNECT], (ev: Event) => {
            if (!isCustomEvent(ev)) return;

            radio.connectToStream();


        });

        wsm.addEventListener(Message.types[Message.types.RADIO_JOIN_ROOM], (ev: Event) => {
            if (!isCustomEvent(ev)) return;
            const msg: DataTypes.Server.RADIO_JOIN_ROOM = ev.detail;
            (userCountDiv.current as HTMLDivElement).innerText = `Users: ${msg[0].userCount}`;
        })


    }, [canvas, progress, title]);



    wsm.connect();

    return (
        <>
            <div className="container">
                <div className="overlay">
                    <div className="userCount" ref={userCountDiv}></div>
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