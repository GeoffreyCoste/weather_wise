'use client'

import { useTranslations } from 'next-intl'

const DashboardMainPageTitle = () => {

    const t = useTranslations('DashboardMainPage');

    return (
        <h1 className="font-black text-blue-700 dark:text-white text-xl lg:text-3xl mb-4">
            {t('title')}
        </h1>
    )
}

export default DashboardMainPageTitle;