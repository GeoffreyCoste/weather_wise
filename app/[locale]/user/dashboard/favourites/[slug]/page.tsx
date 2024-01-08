
import { getCityById, getWeather, getAirQuality } from "@/utils/handleData"
import DashboardForecastsPageTitle from '@/components/UserDashboard/ForecastsPage/ForecastsPageTitle/ForecastsPageTitle'
import ForecastsSection from "@/components/UserDashboard/ForecastsPage/ForecastsSection/ForecastsSection"
import ButtonNavigateBackward from "@/components/ButtonNavigateBackward/ButtonNavigateBackward";


const DashboardFavouritesCityPage = async ({params}: {params: {slug: string}}) => {

    const splitSlug = params.slug.split('-');
    const cityId = splitSlug[splitSlug.length - 1];

    const city = await getCityById(cityId);
    const {latitude, longitude, timezone} = city;
    const weather = await getWeather(latitude, longitude, timezone);
    const airQuality = await getAirQuality(latitude, longitude, timezone);

    return (
        <div className="flex flex-col">
          <div className="mb-4">
          <ButtonNavigateBackward />
        </div>
          <DashboardForecastsPageTitle />
          <ForecastsSection city={city} weather={weather} airQuality={airQuality} />
        </div>
    )
}

export default DashboardFavouritesCityPage;
