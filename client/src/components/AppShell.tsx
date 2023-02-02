import React from "react";

import { Nav } from "./common/Nav/Nav";
import { Queue } from "./QueueSidebar/Queue";

import { Outlet } from "react-router-dom";
import { Player } from "./Player/Player";
import { Chat } from "./Chat/Chat";


export const AppShell = () => {
    



    return (<>

        <div className="flex h-[100vh] font-inter" >
            <Nav />

            {/* <Outlet /> */}
            <div className="flex flex-col w-[calc(100%-35px-400px)] bg-depth-0 mr-auto pt-11">
                <Player />
                <Chat />
            </div>

            <Queue />
        </div>
        
    </>)
}