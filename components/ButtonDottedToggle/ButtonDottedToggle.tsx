'use client'

import { useState, MouseEventHandler } from "react";

type Props = {
    isOpen: boolean;
    setIsOpen: (event: MouseEvent) => void;
}

const ButtonDottedToggle = ({isOpen, setIsOpen}: Props) => {

    const [isHover, setIsHover] = useState<boolean>(false);
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
        setIsClicked(isClicked => !isClicked);
        setIsOpen;
    }

    return (
        <button 
            id="button-dotted-toggle" 
            className={`relative flex flex-col justify-center items-center gap-y-1 cursor-pointer ${isClicked && 'transition-transform rotate-45'}`} 
            tabIndex={4} 
            onMouseEnter={() => setIsHover(true)} 
            onMouseLeave={() => setIsHover(false)}
            onClick={handleClick}
        >
            <div className={`w-1.5 h-1.5 rounded-full${isHover ? " bg-blue-700 transition-color" : " bg-gray-200 transition-color"}`}></div>
            <div className={`w-1.5 h-1.5 rounded-full${isHover ? " bg-blue-700 transition-color" : " bg-gray-200 transition-color"}`}></div>
            <div className={`w-1.5 h-1.5 rounded-full${isHover ? " bg-blue-700 transition-color" : " bg-gray-200 transition-color"}`}></div>
            <div className={`absolute top-1/2 left-1/2 ${isClicked ? 'opacity-100' : 'opacity-0'} mt-[-3px] ml-[-13px] w-1.5 h-1.5 rounded-full${isHover ? " bg-blue-700 transition-color" : " bg-gray-200 transition-color"}`}></div>
            <div className={`absolute top-1/2 left-1/2 ${isClicked ? 'opacity-100' : 'opacity-0'} mt-[-3px] ml-[7px] w-1.5 h-1.5 rounded-full${isHover ? " bg-blue-700 transition-color" : " bg-gray-200 transition-color"}`}></div>
        </button>
    )
}

export default ButtonDottedToggle;