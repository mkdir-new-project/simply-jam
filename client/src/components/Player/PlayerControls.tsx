import React from "react";

import pause from "../../assets/pause.svg";
import forward from "../../assets/forward.svg";
import previous from "../../assets/previous.svg";
import play from "../../assets/play.svg";

export const PlayerControls: React.FC = () => {
    let current, total, isPlaying, onPlayPause, onPrevious, onNext
    current = '0:00'
    total = '0:00'
    return (<>
        <div>
            <div className="flex justify-center text-text-2 text-sm px-11">
                <p>{current}</p>
                <input className="mx-4 w-full" type="range" id="seekrange" maxLength={100} value={0}/>
                <p>{total}</p>
            </div>
            <div className="flex justify-around px-32 mt-6">
                <button onClick={onPrevious}>
                    <img src={previous} />
                </button>
                <button onClick={onPlayPause}>
                    <img src={isPlaying ? pause : play} />
                </button>
                <button onClick={onNext}>
                    <img src={forward} />
                </button>
            </div>
        </div>
    </>)
}