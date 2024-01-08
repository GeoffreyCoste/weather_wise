'use client'

import React, {useState, useRef, useEffect, useCallback} from 'react'
import {useTheme} from '@/hooks/useTheme'
import {useTranslations} from 'next-intl'
import {LazyMotion, m, AnimatePresence, domAnimation} from 'framer-motion'
import ButtonGroupLanguages from '../ButtonGroupLanguages/ButtonGroupLanguages'
import ButtonGroupTemperatures from '../ButtonGroupTemperatures/ButtonGroupTemperatures'
import SettingsIcon from '../SvgIcons/SettingsIcon/SettingsIcon'

type Props = {
    temperatureCookie: string;
}

const SettingsCollapsibleMenu = ({temperatureCookie}: Props) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const {themeState} = useTheme();

  const t = useTranslations('LocaleLayout');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = useCallback(
    (event: MouseEvent) => {
      const menuNode = menuRef.current;
      if (
        isMenuOpen &&
        menuNode &&
        !menuNode.contains(event.target as Element)
      ) {
        setIsMenuOpen(false);
      }
    },
    [isMenuOpen, menuRef]
  );

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative hidden lg:block">
      <button
        id="button-settings"
        type="button"
        className="w-11 h-11 flex justify-center items-center py-2 rounded-full shadow border border-2 lg:mr-6 bg-white hover:bg-gray-200 border-white dark:bg-blue-950 dark:hover:bg-blue-900 dark:border-blue-900"
        onClick={toggleMenu}
        tabIndex={0}
        role="button"
        aria-label="settings"
      >
        <SettingsIcon classNames="h-6 w-6" />
      </button>

      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isMenuOpen && (
            <m.div
              ref={menuRef}
              className="absolute end-0 z-20 mt-2 flex w-56 flex-col items-center rounded-md p-4 border-2 border-zinc-200 bg-zinc-50 shadow-lg dark:border-blue-900 dark:bg-blue-950"
              role="menu"
              initial={{opacity: 0, scale: 0.25}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0}}
            >
              <button
                type="button"
                className="absolute right-0 flex cursor-pointer items-center pr-3"
                onClick={toggleMenu}
              >
                <svg
                  className="h-8 w-8 opacity-70 hover:opacity-100"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {' '}
                    <path
                      d="M16 8L8 16M8.00001 8L16 16"
                      stroke={
                        themeState.theme === 'light' ? '#1d4ed8' : '#38bdf8'
                      }
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{' '}
                  </g>
                </svg>
              </button>
              <h3
                className={`mb-4 mt-8 text-center font-bold ${
                  themeState.theme === 'light' ? 'text-blue-700' : 'text-white'
                }`}
              >
                {t('header.settings_collapsible_menu.title')}
              </h3>
              <h4
                className={`text-xs font-bold ${
                  themeState.theme === 'light' ? 'text-blue-700' : 'text-white'
                } ml-2 mr-auto`}
              >
                {t('header.settings_collapsible_menu.label_language')}
              </h4>
              <ButtonGroupLanguages />
              <h4
                className={`text-xs font-bold ${
                  themeState.theme === 'light' ? 'text-blue-700' : 'text-white'
                } ml-2 mr-auto mt-4`}
              >
                {t('header.settings_collapsible_menu.label_degrees')}
              </h4>
              <ButtonGroupTemperatures temperatureCookie={temperatureCookie} />
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
};

export default SettingsCollapsibleMenu;