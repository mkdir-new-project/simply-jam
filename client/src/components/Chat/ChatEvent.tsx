import React from "react";

// Grayed out text for events triggered by other users
// Takes in text

interface ChatEventProps {
    text: string;
}

export const ChatEvent: React.FC<ChatEventProps> = ({ text }) => {
    return (<>
        <div className="text-text-4 text-xs italic mb-1">
            {text}
        </div>
    </>)
};