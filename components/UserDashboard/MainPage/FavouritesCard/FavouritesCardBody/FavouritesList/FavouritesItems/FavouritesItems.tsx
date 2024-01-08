'use client'

import FavouritesItemsContent from "./FavouritesItemsContent/FavouritesItemsContent"
import { CityWeather } from "../FavouritesList"

type Props = {
  item: CityWeather;
}

const FavouritesItems = ({item}: Props) => {

  return (
    <li  
      className="h-24 sm:h-16 md:h-14 flex items-center bg-white dark:bg-blue-950 rounded-lg mb-4 px-4 py-2"
    >
        <FavouritesItemsContent favourite={item} />
    </li>
  )
}

export default FavouritesItems;