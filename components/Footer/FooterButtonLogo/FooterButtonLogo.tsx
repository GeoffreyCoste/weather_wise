'use client'

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import LogoPictoBlue from '@/public/weather_wise_picto_blue.svg';
import LogoPictoWhite from '@/public/weather_wise_picto_white.svg';
import LogoBrandBlue from '@/public/weather_wise_brand_blue.svg';
import LogoBrandWhite from '@/public/weather_wise_brand_white.svg';

export const FooterButtonLogo = () => {

    const {themeState} = useTheme();
    const isSmBreakpointReached = useMediaQuery("(min-width: 640px)");

  return (
    <Link
      id="footer-button-logo"
      href="/"
      as="/"
      className="z-50 flex basis-full justify-center sm:basis-1/2"
    >
      <Image
        width={isSmBreakpointReached ? '75' : '50'}
        height="75"
        className="mr-1 rounded-full sm:mr-3"
        src={themeState.theme === 'light' ? LogoPictoBlue : LogoPictoWhite}
        alt="Weather Wise Picto"
        priority
      />
      <Image
        width={isSmBreakpointReached ? '150' : '120'}
        height="75"
        src={themeState.theme === 'light' ? LogoBrandBlue : LogoBrandWhite}
        alt="Weather Wise Brand"
        priority
      />
    </Link>
  )
}
