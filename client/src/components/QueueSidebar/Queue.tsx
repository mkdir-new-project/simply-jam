import React from "react";

interface QueueProps {
    currentlyPlayingRef?: React.Ref<HTMLDivElement>;
}

// manipulate currentlyPlayingRef onclick of QueueItem

export const Queue: React.FC<QueueProps> = ({ currentlyPlayingRef }) => {
    return (
        <div className="w-[400px] h-full bg-depth-2">
            wow
        </div>    
    )
}