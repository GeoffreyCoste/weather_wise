import { CityData } from "@/@types/api-datas"
import { OpenMeteoData } from "@/@types/openmeteo"
import ForecastsCardHeader from "./ForecastsCardHeader/ForecastsCardHeader"
import ForecastsCardBody from "./ForecastsCardBody/ForecastsCardBody"

type Props = {
    city: CityData;
    weather: OpenMeteoData | undefined;
}

const ForecastsCard = async ({city, weather}: Props) => {

    return (
        <div className="w-full lg:w-1/2 xl:w-3/5 flex flex-col px-4 py-8 mb-4 rounded-lg text-blue-700 bg-sky-100 dark:text-white dark:bg-[#0F1A3E]">
          <ForecastsCardHeader city={city} />
          <ForecastsCardBody city={city} weather={weather} />
        </div>
    )
}

export default ForecastsCard;