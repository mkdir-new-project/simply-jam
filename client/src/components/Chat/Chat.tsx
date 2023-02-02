import React from 'react';
import { ChatEvent } from './ChatEvent';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';
import WsManager from '../../structures/WsManager';



interface ChatProps {
    ws?: WsManager;
}

// listens for messages and generates Array of chat messages and events

export const Chat: React.FC<ChatProps> = () => {
    return (<>
        <div className='mx-28 mt-auto p-6 h-[43vh] relative bg-depth-1  rounded-lg rounded-b-none'>
            <div className='text-text-4'>
                CHAT
            </div>
            <div className='scrollbar-hide overflow-y-scroll h-[calc(100%_-_24px_-_30px)] py-4 ml-1'>
                <ChatMessage profilePicture='https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' username='User' message='Wow this is awesome' />
                <ChatMessage profilePicture='https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' username='User' message='Wow this is awesome' />
                <ChatEvent text='User has joined' />
                <ChatMessage profilePicture='https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' username='User' message='Wow this is awesome' />
                <ChatMessage profilePicture='https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' username='User' message='Wow this is awesome' />
                <ChatEvent text='User has joined' />
                <ChatEvent text='User has joined' />
                <ChatMessage profilePicture='https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' username='User' message='Wow this is awesome' />
                <ChatMessage profilePicture='https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' username='User' message='Wow this is awesome' />
                <ChatEvent text='User has joined' />
            </div>
            <ChatInput />
        </div>
    </>)
};