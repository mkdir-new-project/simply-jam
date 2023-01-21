import React from "react";


interface QueueItemProps {
    thumbnail: string;
    title: string;
    artist: string;
    duration: string;
    onClick: () => void;
}

export const QueueItem: React.FC<QueueItemProps> = ({ thumbnail, title, artist, duration, onClick }) => {
    return (<></>)
}