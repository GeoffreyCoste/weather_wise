'use client'

import { useLocale, useTranslations } from "next-intl"
import { CityData } from "@/@types/api-datas"


const CardLocation = (props: CityData) => {

    const {nameFr, nameEn, countryIndexFr, countryIndexEn} = props;

    const locale = useLocale();
    const t = useTranslations("GeoNames");

    return (
      <h3 className="text-sm md:text-base font-semibold mb-2 md:mb-0">{locale === "fr" ? nameFr : nameEn}, {t(`country.${locale === "fr" ? countryIndexFr : countryIndexEn}`)}</h3>
    )
}

export default CardLocation;