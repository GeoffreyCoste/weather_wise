'use client'

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import LogoPictoBlue from '@/public/weather_wise_picto_blue.svg';
import LogoPictoWhite from '@/public/weather_wise_picto_white.svg';
import LogoBrandBlue from '@/public/weather_wise_brand_blue.svg';
import LogoBrandWhite from '@/public/weather_wise_brand_white.svg';

export const HeaderButtonLogo = () => {

    const {themeState} = useTheme();
    const isLgBreakpointReached = useMediaQuery("(min-width: 1024px)");

  return (
    <Link
      id="header-button-logo"
      href="/"
      as="/"
      className="flex sm:mr-auto md:mr-14 lg:mr-auto z-30"
    >
      <Image
        width={isLgBreakpointReached ? '75' : '60'}
        height="75"
        className="mr-1 rounded-full p-2"
        src={
          themeState.theme === 'light' ? LogoPictoBlue : LogoPictoWhite
        }
        alt="Weather Wise Picto"
        priority
      />
      <Image
        width={isLgBreakpointReached ? '150' : '120'}
        height="75"
        src={
          themeState.theme === 'light' ? LogoBrandBlue : LogoBrandWhite
        }
        alt="Weather Wise Brand"
        priority
      />
    </Link>
  )
}
