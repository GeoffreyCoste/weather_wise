import { FavouriteItem } from "./FavouriteItem"
import { City } from "@prisma/client"
import { OpenMeteoData } from "@/@types/openmeteo"
import { getWeather } from "@/utils/handleData"

const getWeathers = async (cities: City[]): Promise<OpenMeteoData[]> => {
    try {
        const weathers = await Promise.all(
            cities.map(async (city: City) => {
              const weather = await getWeather(city.latitude, city.longitude, city.timezone);
              return weather;
            })
        )
        return weathers;
    } catch (error) {
        throw(error);
    }
};

type Props = {
    items: City[],
}

export const FavouritesList = async ({items}: Props) => {

    const weathers: OpenMeteoData[] = await getWeathers(items);

    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 grid-rows-4 gap-4">
            {items.map((item, index) => (
                    <li 
                      key={`${index}-0c2bd7dd-4abd-4b8e-8964-0356778c2d16`} 
                      className="flex bg-white dark:bg-blue-950 rounded-lg mb-4"
                    >
                        <FavouriteItem city={item} weather={weathers[index]} />
                    </li>
                ))
            }
        </ul>
    )
}
