'use client'

import Image from "next/image"
import { useLocale } from "next-intl"
import { useTemperature } from "@/hooks/useTemperature"
import { getWeatherSvgIconPath } from "@/utils/getWeatherSvgIconPath"
import WaterDropIcon from "@/components/SvgIcons/WaterDropIcon/WaterDropIcon"
import { CityWeather } from "../../FavouritesList"

type Props = {
    favourite: CityWeather;
}

const FavouritesItemsContent = ({favourite}: Props) => {

    const locale = useLocale();

    const {city, weather} = favourite;

    const {temperatureState, dispatch} = useTemperature();
    const {temperature} = temperatureState;

    const {current} = weather;

    return (
        <div className="basis-full flex flex-wrap items-center">
            <div className="basis-full sm:basis-1/4 md:basis-1/3 text-sm md:text-base lg:text-sm font-bold line-clamp-2">
                {`${locale === "fr" ? city.nameFr : city.nameEn}`}
            </div>
            <div className="basis-full sm:basis-3/4 md:basis-2/3 flex justify-evenly items-center">
                <div className="basis-1/3 flex justify-start sm:justify-end lg:justify-end">
                    {current && (
                        <Image
                            width={25}
                            height={25}
                            className="w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12"
                            src={getWeatherSvgIconPath(current.weathercode, current.is_day, false)}
                            alt="Weather Icon"
                            priority
                        />
                    )}
                </div>
                <div className="basis-1/3 flex justify-center lg:justify-center text-sm md:text-base lg:text-sm font-semibold text-blue-400 dark:text-gray-300">
                    {current && current.temperature_2m}
                    &deg;
                    {temperature === 'celsius' ? 'C' : 'F'}
                </div>
                <div className="basis-1/3 flex justify-center sm:justify-start lg:justify-end items-center">
                    <WaterDropIcon classNames="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5" />
                    <p className="text-sm md:text-base lg:text-sm font-semibold text-blue-400 dark:text-gray-300">
                        {current && current.relativehumidity_2m}
                        &#37;
                    </p>
                </div>
            </div>
        </div>
    )
};

export default FavouritesItemsContent;