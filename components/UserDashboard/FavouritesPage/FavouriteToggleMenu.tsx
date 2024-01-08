'use client'

import { useState, useEffect, useRef } from 'react'
import DottedToggle from '@/components/DottedToggle/DottedToggle'
import ToggleButton from '@/components/ToggleButton/ToggleButton'
import ToggleMenu from '@/components/ToggleMenu/ToggleMenu'
import ButtonRemoveFavourite from '@/components/ButtonRemoveFavourite/ButtonRemoveFavourite'

type Props = {
    geonameId: string;
}

const FavouriteToggleMenu = ({geonameId}: Props) => {

    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setIsClicked(isClicked => !isClicked);
        setIsOpen(isOpen => !isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        const menuNode = menuRef.current;
        if (
          isOpen &&
          menuNode &&
          !menuNode.contains(event.target as Element)
        ) {
            setIsClicked(isClicked => !isClicked);
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        handleClick;
    }, []);

    return (
      <div className="relative block z-10">
        <ToggleButton 
            tabIndex={4}
            onClick={handleClick}
            isDisabled={false}
        >
            <DottedToggle isClicked={isClicked} />
        </ToggleButton>
        {isOpen && (
            <ToggleMenu ref={menuRef}>
                <ul className="w-4/5">
                    <li className="relative before:absolute before:-right-1 before:top-1/2 before:-translate-y-1/2 before:w-[2px] before:h-7 before:bg-blue-300 before:dark:bg-blue-900 ">
                        <ButtonRemoveFavourite geonameId={geonameId} setMenuIsOpen={setIsOpen} setMenuIsClicked={setIsClicked} />
                    </li>
                </ul>
            </ToggleMenu>
        )}
      </div>
    )
}

export default FavouriteToggleMenu;