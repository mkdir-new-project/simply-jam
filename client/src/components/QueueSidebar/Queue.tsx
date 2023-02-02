import React from "react";

import edit from "../../assets/edit.svg";
import settings from "../../assets/settings.svg";
import shuffle from "../../assets/shuffle.svg";
import repeat from "../../assets/repeat.svg";


interface QueueProps {
    currentlyPlayingRef?: React.Ref<HTMLDivElement>;
}

import { QueueItem } from "./QueueItem";
import { QueueAdd } from "./QueueAdd";

// manipulate currentlyPlayingRef onclick of QueueItem

export const Queue: React.FC<QueueProps> = ({ currentlyPlayingRef }) => {
    let roomName = "Name of Room"
    const searchModalRef = React.useRef<HTMLDivElement>(null);
    return (
        <div className="w-[400px] h-full bg-depth-2 py-11 px-10">
            <div className="flex mb-9">
                <h2 className="text-lg text-text-1">{roomName}</h2>
                <Controls>
                    <img className="h-[80%] mt-auto ml-3" src={edit} alt="" />
                    <img className="h-[80%] mt-auto ml-3" src={settings} alt="" />
                </Controls>
            </div>
            <div className="flex mb-9">
                <h2 className=" text-text-4 uppercase">NEXT UP</h2>
                <Controls>
                    <img className="h-[80%] mt-auto ml-3" src={shuffle} alt="" />
                    <img className="h-[80%] mt-auto ml-3" src={repeat} alt="" />
                </Controls>
            </div>
            <div>
                <QueueItem thumbnail="https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=906&q=80" title="The Box The BoxThe Box The Box The Box The Box " artist="Roddy Ricch" duration="3:19" onClick={() => {}} />
                <QueueItem thumbnail="https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=906&q=80" title="The Box The BoxThe Box The Box The Box The Box " artist="Roddy Ricch" duration="3:19" onClick={() => {}} />
                <QueueItem thumbnail="https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=906&q=80" title="The Box The BoxThe Box The Box The Box The Box " artist="Roddy Ricch" duration="3:19" onClick={() => {}} />
                <QueueItem thumbnail="https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=906&q=80" title="The Box The BoxThe Box The Box The Box The Box " artist="Roddy Ricch" duration="3:19" onClick={() => {}} />
                <QueueItem thumbnail="https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=906&q=80" title="The Box The BoxThe Box The Box The Box The Box " artist="Roddy Ricch" duration="3:19" onClick={() => {}} />
                <QueueItem thumbnail="https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=906&q=80" title="The Box The BoxThe Box The Box The Box The Box " artist="Roddy Ricch" duration="3:19" onClick={() => {}} />
                <QueueItem thumbnail="https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=906&q=80" title="The Box The BoxThe Box The Box The Box The Box " artist="Roddy Ricch" duration="3:19" onClick={() => {}} />
            </div>
            <QueueAdd searchModalRef={searchModalRef} />
        </div>    
    )
}

interface ControlsProps {
    children?: React.ReactNode | React.ReactNode[];
}

const Controls: React.FC<ControlsProps> = ({ children }) => {
    return (
        <div className="flex ml-auto">
            {children}
        </div>
    )
}