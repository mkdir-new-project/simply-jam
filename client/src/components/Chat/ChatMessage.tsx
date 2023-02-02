import React from 'react';

// Chat message sent by any user
// Takes in profilePircure, username, message

interface ChatMessageProps {
    profilePicture: string;
    username: string;
    message: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = () => {
    return (<>
        <div className='flex align-middle mb-1'>
            <img className='rounded-full h-6 object-cover aspect-square' src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
            <p className='h-fit my-auto ml-2 text-text-3 text-xs'>
                <span>Username: </span>
                <span>Message</span>
            </p>
        </div>
    </>)
};