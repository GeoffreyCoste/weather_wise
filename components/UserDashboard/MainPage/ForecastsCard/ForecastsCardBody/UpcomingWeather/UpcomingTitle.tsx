'use client'

import { useTranslations } from 'next-intl'

const UpcomingTitle = () => {

    const t = useTranslations('DashboardMainPage');

    return (
        <>
            {t.rich('forecastsCard.upcoming_weather.title', {
                h4: (chunks) => <h3>{chunks}</h3>,
                strong: (chunks) => <strong>{chunks}</strong>
            })}
        </>
    )
}

export default UpcomingTitle;