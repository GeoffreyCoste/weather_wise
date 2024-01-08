'use client'

import { useTranslations } from 'next-intl'

const CardTitle = () => {

    const t = useTranslations('DashboardMainPage');

    return (
        <h2 className="font-extrabold text-blue-700 dark:text-white text-lg">
            {t('forecastsCard.title')}
        </h2>
    )
}

export default CardTitle;