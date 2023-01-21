import React from "react";

// takes in ref of nav element, and toogles the active class

interface NavBurgerProps {
    navRef: React.RefObject<HTMLDivElement>;
}

export const NavBurger: React.FC<NavBurgerProps> = ({ navRef }) => {
    return (<></>)
}
