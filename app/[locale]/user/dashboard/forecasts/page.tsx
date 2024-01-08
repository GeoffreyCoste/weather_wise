import { getServerSession } from "next-auth"
import { getCityById, getWeather, getAirQuality } from "@/utils/handleData"
import { getUserLocationId } from "@/actions/userActions"
import DashboardForecastsPageTitle from '@/components/UserDashboard/ForecastsPage/ForecastsPageTitle/ForecastsPageTitle'
import ForecastsSection from "@/components/UserDashboard/ForecastsPage/ForecastsSection/ForecastsSection"
import ButtonNavigateBackward from "@/components/ButtonNavigateBackward/ButtonNavigateBackward"


const DashboardForecastsPage = async () => {

  const { user: userSession } = await getServerSession() || {};

  const id: string = await getUserLocationId(userSession!.email) || '';

  const city = await getCityById(id);
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

export default DashboardForecastsPage;
