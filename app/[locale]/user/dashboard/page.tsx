import { getServerSession } from "next-auth"
import { getUserLocationId } from "@/actions/userActions"
import { getCityById, getWeather } from "@/utils/handleData"
import DashboardMainPageTitle from '@/components/UserDashboard/MainPage/Title/DashboardMainPageTitle'
import ForecastsCard from "@/components/UserDashboard/MainPage/ForecastsCard/ForecastsCard"
import FavouritesCard from "@/components/UserDashboard/MainPage/FavouritesCard/FavouritesCard"

export interface CityInterface {
  id: string;
  name: string;
  state: string;
  country: string;
  coord: {lon: number; lat: number};
  timezone: string;
  countryId?: string;
  continent?: string;
}

export type DashboardMainPageProps = {
	params: { [key: string]: string | string[] | undefined };
	searchParams?: { [key: string]: string | undefined };
};

const DashboardMainPage = async (props: DashboardMainPageProps) => {

  const { user: userSession } = await getServerSession() || {};

  const id: string = await getUserLocationId(userSession!.email) || '';
  
  const city = await getCityById(id);
  const {latitude, longitude, timezone} = city;
  const weather = await getWeather(latitude, longitude, timezone);

  return (
    <div className="flex flex-col">
      <DashboardMainPageTitle />
      <div className="flex flex-col lg:flex-row gap-x-4">
        <ForecastsCard city={city} weather={weather} />
        <div className="basis-full flex flex-col">
          <FavouritesCard {...props} />
        </div>
      </div>
    </div>
  )
}

export default DashboardMainPage;