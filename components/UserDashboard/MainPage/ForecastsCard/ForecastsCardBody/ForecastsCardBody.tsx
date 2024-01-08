import BrieflyCard from './BrieflyCard/BrieflyCard'
import BrieflyTitle from './BrieflyCard/BrieflyTitle'
import UpcomingCardsList from './UpcomingWeather/UpcomingCardsList'
import UpcomingTitle from './UpcomingWeather/UpcomingTitle'
import { OpenMeteoData } from '@/@types/openmeteo'
import { CityData } from '@/@types/api-datas'

type Props = {
    city: CityData;
    weather: OpenMeteoData | undefined;
}

const ForecastsCardBody = ({city, weather}: Props) => {
  return (
    <div className="flex flex-col">
        <BrieflyTitle />
        <BrieflyCard city={city} weather={weather} />
        <UpcomingTitle />
        <UpcomingCardsList weather={weather} />
    </div>
  )
}

export default ForecastsCardBody;