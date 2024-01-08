'use client'

import { useTranslations } from 'next-intl'

const DetailsTitle = () => {

    const t = useTranslations('DashboardForecastsPage');

    return (
        <>
            {t.rich('forecastsCard.details_weather.title', {
                h4: (chunks) => <h4 className="mb-4">{chunks}</h4>,
                strong: (chunks) => <strong>{chunks}</strong>
            })}
        </>
    )
}

export default DetailsTitle;