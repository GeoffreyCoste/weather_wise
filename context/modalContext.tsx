'use client'

import { useState, createContext, PropsWithChildren } from "react";

export type ModalContextInterface = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const ModalContext = createContext<ModalContextInterface>({
    isOpen: false,
    open: () => undefined,
    close: () => undefined,
});

export const ModalProvider = ({children}: PropsWithChildren) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const open = () => {
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
    }

    return (
        <ModalContext.Provider value={{isOpen, open, close}}>
            {children}
        </ModalContext.Provider>
    )
}