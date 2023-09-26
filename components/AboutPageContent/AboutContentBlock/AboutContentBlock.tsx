'use client'

import { useTranslations } from 'next-intl';

export const AboutContentBlock = () => {

    const t = useTranslations('AboutPage');

    return (
        <div className="sm:px-10">
            <p className="text-blue-700 dark:text-white">
              {t('description.p1')}
            </p>
            <br />
            <p className="text-blue-700 dark:text-white">
              {t('description.p2')}
            </p>
        </div>
    )
}
