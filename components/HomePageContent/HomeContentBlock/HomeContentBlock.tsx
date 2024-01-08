'use client'

import { useTranslations } from 'next-intl'
import ButtonSignup from '@/components/ButtonSignup/ButtonSignup'

export const HomeContentBlock = () => {

    const t = useTranslations('HomePage');

    return (
        <div>
          <p className="text-center text-blue-700 dark:text-white mx-auto w-3/4 sm:w-10/12 md:w-4/5 lg:w-3/5">
            {t('baseline')}
          </p>
          <ButtonSignup styleVariations="w-60 block mx-auto my-6 sm:my-12 text-white bg-gradient-to-tr from-blue-700 to-blue-400 lg:hover:bg-gradient-to-tl dark:text-[#172554] dark:bg-gradient-to-tr dark:from-sky-400 dark:to-cyan-300 lg:dark:hover:bg-gradient-to-tl z-50" />
        </div>
    )
}
