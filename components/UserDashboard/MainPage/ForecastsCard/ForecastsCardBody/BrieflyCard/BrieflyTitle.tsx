'use client'

import { useTranslations } from 'next-intl'

const CurrentlyTitle = () => {

    const t = useTranslations('DashboardMainPage');

    return (
        <>
            {t.rich('forecastsCard.briefly_weather.title', {
                h4: (chunks) => <h4>{chunks}</h4>,
                strong: (chunks) => <strong>{chunks}</strong>
            })}
        </>
    )
}

export default CurrentlyTitle;







