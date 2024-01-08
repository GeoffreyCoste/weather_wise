'use client'

import { useTranslations } from 'next-intl'

const WeeklyTitle = () => {

    const t = useTranslations('DashboardForecastsPage');

    return (
        <>
            {t.rich('forecastsCard.weekly_weather.title', {
                h4: (chunks) => <h4>{chunks}</h4>,
                strong: (chunks) => <strong>{chunks}</strong>
            })}
        </>
    )
}

export default WeeklyTitle;