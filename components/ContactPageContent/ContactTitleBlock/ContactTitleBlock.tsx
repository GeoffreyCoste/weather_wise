'use client'

import { useTranslations } from 'next-intl';

export const ContactTitleBlock = () => {

    const t = useTranslations('ContactPage');

    return (
        <div>
            {t.rich('title', {
              h1: (chunks) => (
                <h1
                className="mb-8 w-full text-center text-4xl font-black leading-tight tracking-tight text-blue-700 dark:text-white"
                >
                  {chunks}
                </h1>
              )
            })}
        </div>
    )
}
