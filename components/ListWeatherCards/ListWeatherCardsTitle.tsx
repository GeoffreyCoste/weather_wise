'use client'

import { useLocale, useTranslations } from "next-intl"
import { CityData } from "@/@types/api-datas";

export const ListWeatherCardsTitle = (props: CityData) => {

    const {nameFr, nameEn, countryIndexFr, countryIndexEn} = props;

    const locale = useLocale();
    const t = useTranslations('DashboardFavouritesPage');

    return (
      <h2
        className="text-center text-2xl font-black text-blue-700 dark:text-white"
      >
        {`${locale === "fr" ? nameFr : nameEn}`} <br />
        <span className="font-bold text-lg text-blue-300 dark:text-gray-400">
          {t(`settings_menu.cards.filter.dropdown_stacked.countries.filters.${locale === "fr" ? countryIndexFr : countryIndexEn}`)}
        </span>
      </h2>
    )
}
