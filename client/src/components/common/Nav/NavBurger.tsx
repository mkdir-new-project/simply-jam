import React from "react";

import menu from '../../../assets/menu.svg';

// takes in ref of nav element, and toogles the active class

interface NavBurgerProps {
    navRef?: React.RefObject<HTMLDivElement>;
}

export const NavBurger: React.FC<NavBurgerProps> = ({ navRef }) => {
    return (<>
        <button
            className="flex flex-col mb-11 items-center justify-center w-[35px] h-[35px] text-white hover:bg-slate-700"
            onClick={() => {
                navRef?.current?.classList.toggle('active');
            }}
        >
            <img src={ menu } />
        </button>
    </>)
}
