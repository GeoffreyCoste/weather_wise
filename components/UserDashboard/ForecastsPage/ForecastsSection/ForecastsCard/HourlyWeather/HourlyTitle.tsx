'use client'

import { useTranslations } from 'next-intl'

const HourlyTitle = () => {

    const t = useTranslations('DashboardForecastsPage');

    return (
        <>
            {t.rich('forecastsCard.hourly_weather.title', {
                h4: (chunks) => <h4>{chunks}</h4>,
                strong: (chunks) => <strong>{chunks}</strong>
            })}
        </>
    )
}

export default HourlyTitle;