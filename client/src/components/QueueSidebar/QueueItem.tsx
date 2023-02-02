import React from "react";


interface QueueItemProps {
    thumbnail: string;
    title: string;
    artist: string;
    duration: string;
    onClick: () => void;
}

export const QueueItem: React.FC<QueueItemProps> = ({ thumbnail, title, artist, duration, onClick }) => {
    
    const turnicatedText = (text: string, length: number) => {
        if (text.length > length) {
            return text.slice(0, length) + "...";
        }
        return text;
    }
    
    return (<>
        <div className="flex mb-3">
            <img className="h-12 w-12" src={thumbnail} alt="" />
            <div className="ml-4 w-full">
                <h2 className="text-text-1">{turnicatedText(title, 26)}</h2>
                <div className="flex">
                    <h2 className="text-text-4 text-sm">By {artist}</h2>
                    <h2 className="text-text-4 ml-auto text-sm">{duration}</h2>
                </div>
            </div>
        </div>
    </>)
}