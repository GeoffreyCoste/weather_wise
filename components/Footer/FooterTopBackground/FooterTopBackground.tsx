'use client'

import Image from "next/image"
import { useTheme } from "@/hooks/useTheme"
import CloudsBlue from '@/public/clouds_blue.svg'
import CloudsLight from '@/public/clouds_light.svg'

export const FooterTopBackground = () => {

    const {themeState} = useTheme();
    return (
        <Image
            className="object-fill scale-[4] sm:object-cover sm:scale-100"
            src={
              themeState.theme === 'light' ? CloudsBlue : CloudsLight
            }
            sizes="(max-width: 640px) 50vw, 100%"
            alt="Clouds"
            fill
        />
    )
}
