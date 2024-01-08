'use client'

import Link from "next/link"
import Image from "next/image"
import moment from "moment-timezone"
import { useLocale, useTranslations } from "next-intl"
import { useTemperature } from "@/hooks/useTemperature"
import Badge from "@/components/Badge/Badge"
import { ClockIcon } from "@/components/SvgIcons/ClockIcon/ClockIcon"
import { getWeatherSvgIconPath } from "@/utils/getWeatherSvgIconPath"
import { OpenMeteoData } from "@/@types/openmeteo"
import { City } from "@prisma/client"
import FavouriteToggleMenu from "./FavouriteToggleMenu"

type Props = {
    weather: OpenMeteoData;
    city: City;
}

export const FavouriteItem = ({city, weather}: Props) => {

    const locale = useLocale();
    const t = useTranslations('GeoNames');

    const {
        geonameId, 
        nameFr,
        nameEn, 
        countryIndexFr,
        countryIndexEn, 
        continentIndexFr,
        continentIndexEn,
        timezone, 
    } = city;

    const {temperatureState, dispatch} = useTemperature();
    const {temperature} = temperatureState;
  
    return (
        <div className="basis-full relative">
            <div className="absolute top-2 right-4 grow flex justify-end mt-3.5">
                <FavouriteToggleMenu geonameId={geonameId} />
            </div>
            <Link className="basis-full flex flex-col px-2 md:px-4 py-2" href={locale === "fr" ? `/user/dashboard/favourites/${nameFr.toLowerCase().split(' ').join('-')}-${geonameId}` : `/user/dashboard/favourites/${nameEn.toLowerCase().split(' ').join('-')}-${geonameId}`}>
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="font-black text-blue-700 dark:text-white">   {locale === "fr" ? nameFr : nameEn}</h2>
                        <h3 className="text-sm font-semibold text-blue-300  dark:text-gray-400">
                            {t(`country.${locale === "fr" ? countryIndexFr :    countryIndexEn}`)}
                        </h3>
                    </div>
                    
                </div>
                <div className="flex justify-center items-center mb-6">
                    <Image
                      width={25}
                      height={25}
                      className="w-24 h-24 md:w-auto mw:h-auto"
                      src={getWeatherSvgIconPath(weather!.current!.weathercode, weather!.current!.is_day, false)}
                      alt="Weather Icon"
                      priority
                    />
                    <div className="text-2xl sm:text-3xl md:text-4xl font-black ml-4">
                        {weather?.current?.temperature_2m}
                        &deg;
                        {temperature === 'celsius' ? 'C' : 'F'}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-xs flex items-center gap-x-1">
                        <ClockIcon />
                        {moment().tz(timezone).format('HH:mm')}
                    </div>
                    <div className="flex gap-x-1">
                        <Badge 
                            badgeStyle="inline-flex items-center justify-center rounded-full bg-yellow-100 md:ml-4 mr-auto md:mr-0  px-2.5 py-0.5"
                            textStyle="whitespace-nowrap text-xs font-semibold  md:font-bold text-amber-700"
                            translation={{namespace:"GeoNames", value:  `continent.${locale === "fr" ?   continentIndexFr :  continentIndexEn}`}}
                        />
                    </div>
                </div>
            </Link>
        </div>
    )
}