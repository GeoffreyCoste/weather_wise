'use client'

import { useState } from "react"
import { useParams } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { CityData } from "@/@types/api-datas"
import { OpenMeteoData } from "@/@types/openmeteo"
import ForecastsCard from "./ForecastsCard/ForecastsCard"
import ButtonFilter from "@/components/ButtonFilter/ButtonFilter"
import Badge from "@/components/Badge/Badge";
import HomeIcon from '@/public/icons/home.svg'

type Props = {
    city: CityData;
    weather: OpenMeteoData | undefined;
    airQuality: any;
}

const filters = ['daily', 'weekly'];

const ForecastsSection = ({city, weather, airQuality}: Props) => {
    
    const [periodicity, setPeriodicity] = useState('daily');

    const params = useParams();
    console.log(params);

    const locale = useLocale();
    const t = useTranslations('GeoNames');

    const {
      nameFr,
      nameEn, 
      countryIndexFr,
      countryIndexEn,
      continentIndexFr,
      continentIndexEn
  } = city;

    return (
      <section id="section-forecasts">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-wrap items-center gap-x-3 mb-4">
            <h2 className="font-bold text-blue-700 dark:text-white text-lg">
                {locale === "fr" ? nameFr : nameEn}, {t(`country.${locale === "fr" ? countryIndexFr : countryIndexEn}`)}
            </h2>
            {!params.slug ? (
              <Badge 
                badgeStyle="inline-flex h-5 items-center justify-center  rounded-full bg-yellow-100 px-2.5 py-0.5 gap-x-2"
                textStyle="whitespace-nowrap text-xs font-semibold md:font-bold text-amber-700"
                translation={{namespace: "DashboardMainPage", value:  "forecastsCard.badge_residence"}}
                iconPath={HomeIcon}
                iconAlt="Home Icon"
              />
            ) : (
              <Badge 
                badgeStyle="inline-flex items-center justify-center rounded-full bg-yellow-100 px-2.5 py-0.5"
                textStyle="whitespace-nowrap text-xs font-semibold md:font-bold  text-amber-700"
                translation={{namespace:"GeoNames", value: `continent.${locale === "fr" ?   continentIndexFr : continentIndexEn}`}}
              />
            )}
          </div>
          <div className="basis-1/2 flex lg:justify-end gap-x-2 pb-2">
            {filters.map((filter, index) => (
                <ButtonFilter key={`${index}-aa995dfe-45cf-4e68-8fba-76e3967b4a1d`} activeFilter={periodicity} filter={filter} message={`forecastsCard.button_${filter}_filter`} namespace="DashboardForecastsPage" setActiveFilter={setPeriodicity} />
            ))}
          </div>
        </div>
        <div className="w-full mb-4 rounded-lg px-4 pb-8 pt-6 text-blue-700 dark:text-white bg-sky-100 dark:bg-[#0F1A3E]">
          <ForecastsCard city={city} weather={weather} airQuality={airQuality} periodicity={periodicity} />
        </div>
      </section>

    )
}

export default ForecastsSection;