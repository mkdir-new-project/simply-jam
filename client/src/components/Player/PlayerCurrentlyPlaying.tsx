import React from "react";
import { PlayerControls } from "./PlayerControls";

interface PlayerCurrentlyPlayingProps {
    ref: React.Ref<HTMLDivElement>;
}

export const PlayerCurrentlyPlaying: React.FC<PlayerCurrentlyPlayingProps> = () => {
    let name, artist, imgSrc
    name = 'Title of Song, It can get pretty long sometimes'
    artist = 'Artist Name'
    imgSrc = 'https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=906&q=80'
    return (<>
        <div className="flex mx-28 h-[45vh] rounded-lg border border-solid border-depth-4">
            <div className="w-full h-full flex flex-col justify-center align-middle">
                <h1 className="text-center text-text-1 font-bold text-3xl px-20 mb-2">{name}</h1>
                <h2 className="text-center text-text-3 mb-8">By {artist}</h2>
                <PlayerControls />
            </div>
            <img className="h-full ml-auto rounded-r-lg" src={imgSrc} />
        </div>
    </>)
}

