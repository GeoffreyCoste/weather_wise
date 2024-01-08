'use client'

import { useTranslations } from 'next-intl';

export const HomeTitleBlock = () => {

    const t = useTranslations('HomePage');

    return (
        <div>
            {t.rich('title', {
              h1: (chunks) => (
                <h1
                className="relative mx-auto mt-8 lg:mt-14 mb-20 w-full text-center text-3xl font-black leading-tight tracking-tight sm:text-4xl md:mb-24 md:text-5xl lg:mb-32 text-blue-700 dark:text-white md:w-full md:px-8 lg:w-full lg:p-0 lg:text-7xl"
                >
                  {chunks}
                </h1>
              ),
              span: (chunks) => (
                <span
                className="absolute -bottom-12 left-1/2 w-[400px] -translate-x-1/2 text-3xl uppercase leading-relaxed text-yellow-400 sm:text-4xl md:-bottom-16 md:w-[600px] md:text-5xl lg:-bottom-20 lg:w-[800px] lg:text-7xl"
                >
                  {chunks}
                </span>
              )
            })}
        </div>
    )
}
