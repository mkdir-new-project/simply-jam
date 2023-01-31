import React from "react";
import { NavAction } from "./NavAction";
import { NavParticipants } from "./NavParticipants";
import { NavBurger } from "./NavBurger";

import menu from '../../../assets/menu.svg';
import home from '../../../assets/home.svg';
import profile from '../../../assets/profile.svg';
import bell from '../../../assets/bell.svg';
import logout from '../../../assets/logout.svg';
import settings from '../../../assets/settings.svg';

// Compose the nav bar

export const Nav: React.FC = () => {
    return (
        <nav className="flex flex-col w-[35px] h-full bg-depth-2 pt-8 pb-4">
            <NavBurger />
            <NavAction iconSvgUrl={home} onClick={() => {}} />
            <NavAction iconSvgUrl={profile} onClick={() => {}} />
            <NavAction iconSvgUrl={bell} onClick={() => {}} />
            <NavAction iconSvgUrl={menu} onClick={() => {}} />
            <div className="mt-auto"></div>
            <NavAction iconSvgUrl={logout} onClick={() => {}} />
            <NavAction iconSvgUrl={settings} onClick={() => {}} />
        </nav>
    )
}