'use client'

import { useTranslations, useLocale } from 'next-intl'
import moment from 'moment'
import 'moment/locale/fr'

type Props = {
    index: number;
}

const SelectedDayTitle = ({index}: Props) => {

    const locale = useLocale();
    const t = useTranslations('DashboardForecastsPage');

    return (
        <h5 className="mb-4">
            {t('forecastsCard.weekly_weather.details.current_weather.title')}
            <strong className="ml-1">{`${moment().locale(locale).add(index, 'day').format('LL')}`}</strong>
        </h5>
    )
}

export default SelectedDayTitle;