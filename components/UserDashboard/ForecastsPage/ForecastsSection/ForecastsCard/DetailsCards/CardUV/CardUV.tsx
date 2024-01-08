'use client'

import { useTranslations } from "next-intl"
import CircularChart from "@/components/CircularChart/CircularChart"

type Props = {
    title: string;
    value: number;
    desc: string;
}

const CardUV = ({title, value, desc}: Props) => {
  
    const t = useTranslations('DashboardForecastsPage');
    
    return (
        <>
            <h4 className="text-sm text-center text-blue-400 dark:text-sky-400 font-bold">{t(`${title}`)}</h4>
            <CircularChart value={value} />
            <span className="text-xs">{t(`${desc}`)}</span>
        </>
    )
}

export default CardUV;