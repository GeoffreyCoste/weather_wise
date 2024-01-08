import FavouritesItems from "./FavouritesItems/FavouritesItems"
import { CityData } from "@/@types/api-datas"
import { OpenMeteoData } from "@/@types/openmeteo"

export interface CityWeather {
  city: CityData;
  weather: OpenMeteoData;
}

type Props = {
  items: CityWeather[];
}

const FavouritesList = ({items}: Props) => {

  console.log('Items: ', items);

  return (
    <div>
      <ul className={`h-[370px] lg:h-[660px] block overflow-y-auto ${items && items?.length > 9 && "lg:pr-4"}`}>
        {items && items.length && items.map((item, index) => (
          <FavouritesItems 
            key={`${index}-0c2bd7dd-4abd-4b8e-8964-0356778c2d16`} 
            item= {item} 
          />
        ))}
      </ul>
    </div>
  )
}

export default FavouritesList;