import React, { ReactSVGElement } from "react";


interface NavActionProps {
    text?: string;
    iconSvgUrl: string;
    onClick: () => void;
}

export const NavAction: React.FC<NavActionProps> = ({ text, iconSvgUrl, onClick }) => {
    return (
        <button
            className={`flex flex-col mb-2 items-center justify-center w-[35px] h-[35px] text-white hover:bg-slate-700`}
            onClick={onClick}
        > 
            <img src={ iconSvgUrl } /> 
        </button>
    )
}