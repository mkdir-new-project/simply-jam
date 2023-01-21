import React from 'react';

// Chat message sent by any user
// Takes in profilePircure, username, message

interface ChatMessageProps {
    profilePicture: string;
    username: string;
    message: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = () => {
    return (<></>)
};