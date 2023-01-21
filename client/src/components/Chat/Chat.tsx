import React from 'react';
import { ChatEvent } from './ChatEvent';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';
import WsManager from '../../structures/WsManager';



interface ChatProps {
    ws: WsManager;
}

// listens for messages and generates Array of chat messages and events

export const Chat: React.FC<ChatProps> = () => {
    return (<></>)
};