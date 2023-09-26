'use client'

import { useEffect } from "react";
import { useModal } from "@/hooks/useModal";
import { ModalPortal } from "../ModalPortal";
import { useKeyPress } from "@/hooks/useKeyPress";
import { ModalBackdrop } from "./ModalBackdrop/ModalBackdrop";
import { ModalDialog } from "./ModalDialog/ModalDialog";
import SelectAutocomplete from "@/components/SelectAutocomplete/SelectAutocomplete";

export const Modal = () => {
    
    const {isOpen, open, close} = useModal();

    // custom Hooks handling key press events with modal
    useKeyPress(['ctrlk'], open); // 'ctrl + k' keyboard event
    useKeyPress(['Escape'], close); // 'Escape' keyboard event

    // Enable body scroll when mobile menu not opened
    useEffect(() => {
      let root = document.documentElement; // Targeting <html> tag
      if (isOpen) {
        /* root.classList.add('fixed', 'overflow-y-scroll', 'w-full'); */
        root.classList.add('fixed', 'w-full');
      } else {
        /* root.classList.remove('fixed', 'overflow-y-scroll', 'w-full'); */
        root.classList.remove('fixed', 'w-full');
      }
    }, [isOpen]);

    return (
        <>
            {isOpen && (
                    <ModalPortal>
                        <ModalBackdrop>
                          <ModalDialog>
                              <SelectAutocomplete closeModal={close} />
                          </ModalDialog>
                        </ModalBackdrop>
                    </ModalPortal>
                )
            }
        </>
    )
}