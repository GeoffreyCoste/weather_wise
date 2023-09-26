'use client'

import { useTranslations } from 'next-intl';

export const TitleBlock = () => {

    const t = useTranslations('CityPage');

    return (
        <div>
            {t.rich('title', {
              h1: (chunks) => (
                <h1
                className="mx-auto mb-8 w-full text-center text-lg leading-tight tracking-tight text-blue-700 dark:text-white"
                >
                  {chunks}
                </h1>
              )
            })}
        </div>
    )
}
