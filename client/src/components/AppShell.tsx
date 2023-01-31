import React from "react";

import { Nav } from "./common/Nav/Nav";
import { Queue } from "./QueueSidebar/Queue";

import { Outlet } from "react-router-dom";
import { Player } from "./Player/Player";


export const AppShell = () => {
    



    return (<>

        <div className="flex h-[100vh]" >
            <Nav />

            {/* <Outlet /> */}
            <Player />

            <Queue />
        </div>
        
    </>)
}