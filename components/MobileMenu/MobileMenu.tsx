'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { useSession } from "next-auth/react"
import { LazyMotion, m, domAnimation } from "framer-motion"
import { useTheme } from "@/hooks/useTheme"
import {useElementSize} from '@/hooks/useElementSize'
import ButtonHamburger from "./ButtonHamburger"
import LogoBrandBlue from '@/public/weather_wise_brand_blue.svg'
import LogoPictoBlue from '@/public/weather_wise_picto_blue.svg'
import LogoBrandWhite from '@/public/weather_wise_brand_white.svg'
import LogoPictoWhite from '@/public/weather_wise_picto_white.svg'
import { CardHelloUser } from "./CardHelloUser/CardHelloUser"
import NavList from "../Navlist/NavList"
import ButtonSignup from "../ButtonSignup/ButtonSignup"
import ButtonLogin from "../ButtonLogin/ButtonLogin"
import { ButtonLogout } from "../ButtonLogout/ButtonLogout"
import ButtonGroupLanguages from "../ButtonGroupLanguages/ButtonGroupLanguages"
import ButtonGroupTemperatures from "../ButtonGroupTemperatures/ButtonGroupTemperatures"
import ButtonToggleTheme from "../ButtonToggleTheme/ButtonToggleTheme"


type MobileMenuProps = {
    themeCookie: string;
    temperatureCookie: string;
  
};

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

const content = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
}

const items = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
          y: { stiffness: 1000, velocity: -100 }
        }
      },
      closed: {
        y: 50,
        opacity: 0,
        transition: {
          y: { stiffness: 1000 }
        }
      }
}

const userNavLinks = [
  {
    intlNamespace: "LocaleLayout.side_menu.user_links",
    intlMessage: "dashboard",
    linkHref: "/user/dashboard"
  },
  {
    intlNamespace: "LocaleLayout.side_menu.user_links",
    intlMessage: "account",
    linkHref: "/user/config/account"
  },
  {
    intlNamespace: "LocaleLayout.side_menu.user_links",
    intlMessage: "profile",
    linkHref: "/user/config/profile"
  },
  {
    intlNamespace: "LocaleLayout.side_menu.user_links",
    intlMessage: "settings",
    linkHref: "/user/config/settings"
  }
];

const mainNavLinks = [
  {
    intlNamespace: "LocaleLayout.header.navbar.navlinks",
    intlMessage: "about",
    linkHref: "/about"
  },
  {
    intlNamespace: "LocaleLayout.header.navbar.navlinks",
    intlMessage: "terms",
    linkHref: "/terms"
  },
  {
    intlNamespace: "LocaleLayout.header.navbar.navlinks",
    intlMessage: "contact",
    linkHref: "/contact"
  }
];

export const MobileMenu = ({themeCookie, temperatureCookie}: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [containerRef, {width, height}] = useElementSize();

  const {data, status} = useSession();

  const t = useTranslations("LocaleLayout");

  const {themeState} = useTheme();

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    let root = document.documentElement; // Targeting <html> tag

    if (isOpen) {
      root.classList.add('fixed', 'overflow-y-scroll', 'w-full');
    } else {
      root.classList.remove('fixed', 'overflow-y-scroll', 'w-full');
    }
  }, [isOpen]);

  return (
    <div className="lg:hidden">
        <LazyMotion features={domAnimation}>
          <m.div 
            className="flex justify-center items-center"
            initial={false}
            animate={isOpen ? "open" : "closed"}
          >
            <ButtonHamburger toggled={isOpen} toggle={toggleIsOpen} />
          </m.div>
        </LazyMotion>

        <LazyMotion features={domAnimation}>
            {isOpen && (
              <m.div
                key="side-menu-overlay" // requested by framer motion
                id="side-menu-overlay"
                className={`before:-z-1 ${
                  themeState.theme === 'light'
                    ? 'before:bg-blue-800/25'
                    : 'before:bg-sky-400/25'
                } fixed z-30 left-0 top-0 flex h-full w-full items-center justify-center before:absolute before:h-full before:w-full before:backdrop-blur-sm`}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                onClick={toggleIsOpen}
              ></m.div>
            )}
            {isOpen && (
              <m.div
                className={`w-80 absolute z-30 top-0 right-0 ${isOpen ? 'overflow-y-auto' : ''}`}
                initial={false}
                animate={isOpen ? "open" : "closed"}
                custom={height}
                ref={containerRef}
              >
                  <m.div
                    className={`absolute top-0 right-0 w-80 h-[70rem] bg-zinc-50 dark:bg-[#0F1A3E] ${isOpen ? "z-30" : ""}`}
                    variants={sidebar}
                  ></m.div>
                  {isOpen && (
                    <Link
                      href="/"
                      as="/"
                      className="absolute top-4 left-4 z-40 flex sm:mr-auto"
                      onClick={toggleIsOpen}
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
                  <m.div
                    className={`w-full relative top-32 px-8 text-white ${isOpen ? 'z-40' : ''}`}
                    variants={content}
                  >
                      <m.div variants={items}>
                        {isOpen && data?.user && <CardHelloUser user={data?.user} />}
                      </m.div>
                      <m.div variants={items}>
                        {isOpen && data?.user && <NavList idPrefix='mobile-user' itemsList={userNavLinks} onClick={toggleIsOpen} />}
                        {status === "authenticated" && (
                          <h3
                            className="mb-8 mt-4 pt-4 text-xs font-extrabold                text-blue-700 dark:text-white/75 z-40 border-t-2                dark:border-blue-900"
                          >
                            {t('side_menu.title_learn_more')}
                          </h3>
                        )}
                        {isOpen && <NavList idPrefix='mobile-user' itemsList={mainNavLinks} onClick={toggleIsOpen} />}
                        <h3
                          className={`${data?.user ? 'mt-4 pt-4 text-xs dark:text-white/75 border-t-2 dark:border-blue-900' : 'mt-8 text-base dark:text-white'} mb-8 font-bold text-blue-700`}
                        >
                          {t('side_menu.title_connection')}
                        </h3>
                        {isOpen && data?.user ? (
                          <ButtonLogout
                            buttonIdPrefix="sidemenu-" 
                            styleVariations="w-full"
                          />
                        ) : (
                          <>
                            <ButtonLogin 
                              buttonIdPrefix="sidemenu-" 
                              styleVariations="w-full" 
                              onClick={toggleIsOpen} 
                            />
                            <ButtonSignup 
                              buttonIdPrefix="sidemenu-" 
                              styleVariations="w-full text-blue-700 border border-2 border-blue-700 dark:text-sky-400 dark:border-sky-400 mt-4" 
                              onClick={toggleIsOpen} 
                            />
                          </>
                        )}
                        {!data?.user && (
                          <>
                              <h3
                                className="mb-8 mt-12 font-bold text-blue-700 dark:text-white"
                              >
                                {t('side_menu.title_settings')}
                              </h3>
                              <h4
                                className="mr-auto text-xs font-bold text-blue-700 dark:text-white/75"
                              >
                                {t('side_menu.label_language')}
                              </h4>
                              <ButtonGroupLanguages />
                              <h4
                                className="mr-auto mt-4 text-xs font-bold text-blue-700 dark:text-white/75"
                              >
                                {t('side_menu.label_degrees')}
                              </h4>
                              <ButtonGroupTemperatures temperatureCookie={temperatureCookie} />
                              <ButtonToggleTheme checkboxId="sidemenu-theme-checkbox" themeCookie={themeCookie} buttonIdPrefix="sidemenu-"
                              styleVariations="flex my-8 lg:my-0 lg:mr-6" />
                          </>
                        )}
                      </m.div>
                  </m.div>
              </m.div>
            )}
        </LazyMotion>
    </div>
  );
};