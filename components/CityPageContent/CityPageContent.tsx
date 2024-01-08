import { TitleBlock } from "./TitleBlock/TitleBlock"
import { ListWeatherCards } from "../ListWeatherCards/ListWeatherCards"

type Props = {
  cityId: string;
}

export const CityPageContent = ({cityId}: Props) => {
  
    return (
        <>
          <div
            className="relative flex w-full flex-col rounded-lg px-4 pt-14 sm:w-10/12 sm:pt-24 md:w-3/4 md:pt-32 lg:w-3/4 2xl:w-3/5 bg-white dark:bg-blue-950"
          >
            <TitleBlock />
            <ListWeatherCards cityId={cityId} />
          </div>
        </>
  )
}
