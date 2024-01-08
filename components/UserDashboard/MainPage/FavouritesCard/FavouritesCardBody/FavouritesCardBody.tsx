import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import FavouritesList from "./FavouritesList/FavouritesList"
import { getWeather } from "@/utils/handleData"
import { CityData } from "@/@types/api-datas"
import { OpenMeteoData } from "@/@types/openmeteo"
import { City } from "@prisma/client"
import { getCitiesByUserId } from "@/actions/cityActions"
import { DashboardMainPageProps } from "@/app/[locale]/user/dashboard/page"
import AddFavouriteMessage from "@/components/AddFavouriteMessage/AddFavouriteMessage"


const getWeathers = async (cities: City[]): Promise<OpenMeteoData[]> => {
  try {
      const weathers = await Promise.all(
          cities.map(async (city: CityData) => {
            const weather = await getWeather(city.latitude, city.longitude, city.timezone);
            return weather;
          })
      )
      return weathers;
  } catch (error) {
      throw(error);
  }
};

const FavouritesCardBody = async (props: DashboardMainPageProps) => {

  const session = await getServerSession(authOptions);
  const user = session?.user;

  const locale = props.params.locale;

  let favourites;
  let weathers: OpenMeteoData[];
  let items;

  if (user) {
    favourites = await getCitiesByUserId({id: user?.id, locale});
  }

  if (favourites) {
    weathers = await getWeathers(favourites);
    items = favourites.map((item, index) => {
      return { city: item, weather: weathers[index]};
    })
  }
  
  return (
    <div className="h-full pt-6">
        {items && items.length ? (
          <FavouritesList items={items} />
        ) : (
          <AddFavouriteMessage />
        )}
    </div>
  )
}

export default FavouritesCardBody;