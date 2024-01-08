'use client'

import { useTranslations } from 'next-intl'

const ForecastsPageTitle = () => {

    const t = useTranslations('DashboardForecastsPage');

    return (
        <h1 className="font-black text-blue-300 dark:text-white text-xl mb-4">
            {t('title')}
        </h1>
    )
}

export default ForecastsPageTitle;