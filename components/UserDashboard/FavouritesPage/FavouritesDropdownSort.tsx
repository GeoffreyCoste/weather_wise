'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useTheme } from '@/hooks/useTheme'
import { RadioGroups } from '@/components/RadioGroups/RadioGroups'
import ToggleButton from '@/components/ToggleButton/ToggleButton'
import ToggleMenu from '@/components/ToggleMenu/ToggleMenu'


type Props = {
    disabled: boolean;
    sort: string[];
    order: string | string [] | undefined;
}

export const FavouritesDropdownSort = ({disabled, sort, order}: Props) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const t = useTranslations('DashboardFavouritesPage');

    const {themeState} = useTheme();

    const handleClick = () => {
        setIsOpen(isOpen => !isOpen);
    }

    const handleClickOutside = (event: MouseEvent) => {
        const sortMenu = menuRef.current;
        if (
          isOpen &&
          sortMenu &&
          !sortMenu.contains(event.target as Element)
        ) {
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
        <div className="basis-full md:basis-auto">
            <ToggleButton 
                tabIndex={4}
                onClick={handleClick}
                styles={`w-full lg:w-auto h-11 z-30 flex justify-center items-center gap-2 px-4 py-2 rounded-full bg-blue-700 cursor-pointer ${!disabled ? "lg:hover:bg-blue-800 dark:bg-sky-400 lg:dark:hover:bg-sky-600" : "disabled:bg-blue-700/25 disabled:dark:bg-sky-400/25 disabled:dark:text-gray-400 disabled:cursor-default"}`}
                isDisabled={disabled}
            >
                <span className="font-bold text-sm text-white dark:text-[#0F1A3E]">{t('settings_menu.dropdowns.sort.title')}</span>
                
                <span className={`transition ${isOpen && '-rotate-180'}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke={`${themeState.theme === "light" ? "#ffffff" : "#0F1A3E"}`}
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
            </ToggleButton>
            {isOpen && (
                <ToggleMenu 
                    ref={menuRef}
                    styles="z-20 absolute start-0 md:start-auto md:end-28 top-auto w-full max-w-xs mt-2 rounded-lg"
                >
                    <div className="w-full p-4 bg-zinc-50 border-2 border-zinc-200 dark:bg-blue-950 dark:border-blue-900 rounded-lg shadow-lg">
                        <RadioGroups legend='Sort' inputs={sort} order={order} />
                    </div>
                </ToggleMenu>
            )}
        </div>
    )
}
