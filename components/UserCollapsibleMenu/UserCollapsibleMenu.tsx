'use client'

import React, {useState, useRef, useEffect, useCallback} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {useTheme} from '@/hooks/useTheme'
import {useTranslations} from 'next-intl'
import {LazyMotion, m, AnimatePresence, domAnimation} from 'framer-motion'
import { User } from '@prisma/client'
import ProfileIcon from '../SvgIcons/ProfileIcon/ProfileIcon'
import UserAccountIcon from '../SvgIcons/UserAccountIcon/UserAccountIcon'
import UserEditIcon from '../SvgIcons/UserEditIcon/UserEditIcon'
import SettingsIcon from '../SvgIcons/SettingsIcon/SettingsIcon'

const UserCollapsibleMenu = (props: Partial<User>) => {

  const [isHover, setIsHover] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const {image} = props;

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


  const links = [
    {icon: <UserAccountIcon classNames="w-6 h-6" parentNodeIndex={0} isHover={isHover} />, title: 'account', path: '/user/config/account'},
    {icon: <UserEditIcon classNames="w-6 h-6" parentNodeIndex={1} isHover={isHover} />, title: 'profile', path: '/user/config/profile'},
    {icon: <SettingsIcon classNames='w-6 h-6' parentNodeIndex={2} withHover={true} isHover={isHover} />, title: 'settings', path: '/user/config/settings'}
  ];

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
        className="w-11 h-11 flex justify-center items-center py-2 rounded-full shadow border border-2 lg:mr-6 bg-white hover:bg-gray-200 border-white dark:bg-blue-950 dark:hover:bg-blue-900 dark:border-blue-900 overflow-hidden"
        onClick={toggleMenu}
        tabIndex={0}
        role="button"
        aria-label="settings"
      >
        {image ? (
          <Image 
            width={44}
            height={44}
            className=""
            src={image}
            alt="Profile"
            priority
          />
        ) : (
          <ProfileIcon classNames="w-7 h-7" lightThemeColor="#1d4ed8" darkThemeColor="#38bdf8" />
        )}
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
              <nav id="user-config-navbar" className="w-full space-y-1 mt-12">
                {links.map((link, index) => (
                  <Link
                    key = {`${index}-6086b443-978e-4054-a600-f3535f067ab6`}
                    className="inline-block flex w-full items-center px-4 py-1 transition-all py-3 font-semibold text-blue-700 hover:text-white hover:bg-blue-700 dark:text-sky-400 dark:hover:text-[#0F1A3E] dark:hover:bg-sky-400 rounded-full"
                    href={link.path}
                    onClick={toggleMenu}
                    onMouseEnter={() => setIsHover(index)}
                    onMouseLeave={() => setIsHover(null)}
                  >
                      {link.icon}
                      <span className="capitalize ml-4"> {t(`header.user_collapsible_menu.link_${link.title}`)}</span>
                  </Link>
                ))}
              </nav>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
};

export default UserCollapsibleMenu;