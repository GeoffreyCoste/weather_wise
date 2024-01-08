'use client'

import { useTranslations } from "next-intl"
import { ReactNode } from "react";

type Props = {
    title: string;
    img: ReactNode;
    desc: string;
}

const CardAir = ({title, img, desc}: Props) => {
  
    const t = useTranslations('DashboardForecastsPage');
    
    return (
        <>
            <h4 className="text-sm text-center text-blue-400 dark:text-sky-400 font-bold">{t(`${title}`)}</h4>
            <div className="w-16 h-16 flex justify-center items-center border border-2 border-blue-700 dark:border-sky-400 rounded-full">
                {img}
            </div>
            <span className="text-xs">{t(`${desc}`)}</span>
        </>
    )
}

export default CardAir;