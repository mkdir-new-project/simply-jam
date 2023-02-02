import React from "react"
import WsManager from "../../structures/WsManager"

// Handles emitting of chat message events

interface ChatInputProps {
    ws?: WsManager
}

export const ChatInput: React.FC<ChatInputProps> = ({ ws }) => {
    return (<>
        <div className="relative">
            <img className="absolute top-0 right-1 h-full" src="./src/assets/send.png" alt="" />
            <input className="w-full bg-depth-2 p-2 px-4 pr-10 placeholder:text-text-4 rounded-md text-text-2" type="text" placeholder="Type your message"/>    
        </div>
    </>)
}