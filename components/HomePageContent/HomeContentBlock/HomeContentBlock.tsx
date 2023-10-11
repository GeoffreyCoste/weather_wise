'use client'

import { useTranslations } from 'next-intl';
import ButtonSignup from '@/components/ButtonSignup/ButtonSignup';
import GeolocatedWeather from '@/components/GeolocatedWeather/GeolocatedWeather';

export const HomeContentBlock = () => {

    const t = useTranslations('HomePage');

    return (
        <div>
          <p className="text-center text-blue-700 dark:text-white">
            {t('baseline')}
          </p>
          <ButtonSignup styleVariations="w-60 block mx-auto my-6 sm:my-12 text-white bg-gradient-to-tr from-blue-700 to-blue-400 lg:hover:bg-gradient-to-tl dark:text-[#172554] dark:bg-gradient-to-tr dark:from-sky-400 dark:to-cyan-300 lg:dark:hover:bg-gradient-to-tl z-50" />
          <p className="mb-6 sm:mb-12 text-center text-blue-700 dark:text-white">
            {t('transition_paragraph')}
          </p>
          <h2
            className="text-center text-xl font-extrabold md:text-3xl text-blue-700 dark:text-white"
          >
            {t('sub_title')}
          </h2>
          <GeolocatedWeather />
        </div>
    )
}
