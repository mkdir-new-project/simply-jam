import React, { useRef } from "react";

import { PlayerCurrentlyPlaying } from "./PlayerCurrentlyPlaying";

export const Player: React.FC = () => {
    const currentlyPlayingRef = useRef<HTMLDivElement>(null);
    return (
        <PlayerCurrentlyPlaying ref={currentlyPlayingRef} />
    )
}
