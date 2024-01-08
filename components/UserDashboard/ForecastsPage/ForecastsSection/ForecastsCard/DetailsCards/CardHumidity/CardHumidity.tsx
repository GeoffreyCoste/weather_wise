'use client'

import { useTranslations } from "next-intl"
import AnimatedCounter from "@/components/AnimatedCounter/AnimatedCounter"

type Props = {
    title: string;
    value: number | undefined;
}

const CardHumidity = ({title, value}: Props) => {
  
    const t = useTranslations('DashboardForecastsPage');
    
    return (
        <>
            <h4 className="text-sm text-center text-blue-400 dark:text-sky-400 font-bold">{t(`${title}`)}</h4>
            <div className="h-full flex items-center">
                <div className="flex items-end ml-1 my-6">
                    <AnimatedCounter from={0} to={value} afterDecimal={0} classNames={"text-3xl font-bold mr-2 leading-none"} />
                    <p className="text-xs font-bold">&#37;</p>
                </div>
            </div>
        </>
    )
}

export default CardHumidity;