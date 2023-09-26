'use client';

import React, {useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {LazyMotion, m, useCycle, domAnimation} from 'framer-motion';
import {useElementSize} from '@/hooks/useElementSize';
import {useTheme} from '@/hooks/useTheme';
import { Navigation } from './Navigation/Navigation';
import Settings from './Settings/Settings';
import ButtonToggleMenu from './ButtonToggleMenu/ButtonToggleMenu';
import LogoBrandBlue from '@/public/weather_wise_brand_blue.svg';
import LogoPictoBlue from '@/public/weather_wise_picto_blue.svg';
import LogoBrandWhite from '@/public/weather_wise_brand_white.svg';
import LogoPictoWhite from '@/public/weather_wise_picto_white.svg';

const sidebar = {
  open: (height = 3000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: 'circle(20px at 280px 50px)',
    transition: {
      delay: 0.25,
      type: 'spring',
      stiffness: 400,
      damping: 40
    }
  }
};

type Props = {
  themeCookie: string;
  temperatureCookie: string;
};

export const SideMenu = ({themeCookie, temperatureCookie}: Props) => {
  const [isMenuOpen, toggleOpen] = useCycle(false, true);
  const [containerRef, {width, height}] = useElementSize();

  const {themeState} = useTheme();

  // Disable scroll when menu is opened
  // Adapat z-index property of modal opening button inside Header
  useEffect(() => {
    let root = document.documentElement; // Targeting <html> tag
    let buttonOpenModal = document.querySelector('#button-open-modal');

    if (isMenuOpen) {
      root.classList.add('fixed', 'overflow-y-scroll', 'w-full');
      buttonOpenModal?.setAttribute("style", "z-index:30");
    } else {
      root.classList.remove('fixed', 'overflow-y-scroll', 'w-full');
      setTimeout(() => {
        buttonOpenModal?.removeAttribute("style");
      }, 500);
    }
  }, [isMenuOpen]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={`bottom-0 right-0 top-0 z-40 flex w-80 flex-col justify-center px-8 lg:hidden text-white${
          isMenuOpen ? ' fixed overflow-y-auto' : ' absolute'
        }`}
        initial={false}
        animate={isMenuOpen ? 'open' : 'closed'}
        custom={height}
        ref={containerRef}
      >
        {isMenuOpen && (
          <Link
            href="/"
            as="/"
            className="absolute left-4 top-4 z-40 flex sm:mr-auto"
            onClick={() => toggleOpen()}
          >
            <Image
              width="60"
              height="75"
              className="mr-1 rounded-full p-2"
              src={
                themeState.theme === 'light' ? LogoPictoBlue : LogoPictoWhite
              }
              alt="Weather Wise Picto"
              priority
            />
            <Image
              width="120"
              height="75"
              src={
                themeState.theme === 'light' ? LogoBrandBlue : LogoBrandWhite
              }
              alt="Weather Wise Brand"
              priority
            />
          </Link>
        )}
        <ButtonToggleMenu isMenuOpen={isMenuOpen} toggle={() => toggleOpen()} />
        {isMenuOpen && (
          <m.div
            key="side-menu-overlay" // requested by framer motion
            id="side-menu-overlay"
            className={`before:-z-1 ${
              themeState.theme === 'light'
                ? 'before:bg-blue-800/25'
                : 'before:bg-sky-400/25'
            } fixed left-0 top-0 flex h-full w-full items-center justify-center before:absolute before:h-full before:w-full before:backdrop-blur-sm`}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={() => toggleOpen()}
          ></m.div>
        )}
        <m.div
          className={`absolute bottom-0 left-0 top-0 h-[55rem] w-80 ${
            themeState.theme === 'light' ? 'bg-zinc-50' : 'bg-[#0F1A3E]'
          }`}
          variants={sidebar}
        ></m.div>
        {isMenuOpen && <Navigation />}
        {isMenuOpen && <Settings themeCookie={themeCookie} temperatureCookie={temperatureCookie} />}
      </m.div>
    </LazyMotion>
  );
};
