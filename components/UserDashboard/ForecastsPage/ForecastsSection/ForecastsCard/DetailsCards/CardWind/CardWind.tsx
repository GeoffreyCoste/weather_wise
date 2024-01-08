'use client'

import { LazyMotion, m, domAnimation } from "framer-motion"
import { useTranslations } from "next-intl"
import { useWindspeed } from "@/hooks/useWindspeed"
import AnimatedCounter from "@/components/AnimatedCounter/AnimatedCounter"
import { getWindDirection, getWindIconRotationClass } from "@/utils/getWindInfos"
import NavigationIcon from "@/components/SvgIcons/NavigationIcon/NavigationIcon"


type Props = {
    title: string;
    value: number | undefined;
    direction: string;
    angle: number | undefined;
}

const CardWind = ({title, value,direction, angle}: Props) => {
  
    const t = useTranslations('DashboardForecastsPage');

    const {windspeedState} = useWindspeed();
    
    const rotation = getWindIconRotationClass(getWindDirection(angle));

    return (
        <>
            <h4 className="text-sm text-center text-blue-400 dark:text-sky-400 font-bold">{t(`${title}`)}</h4>
            <div className="flex flex-wrap items-end text-center my-6">
                <AnimatedCounter from={0} to={value} afterDecimal={1} classNames={"basis-full md:basis-auto text-3xl font-bold md:mr-2 leading-none"} />
                <p className="basis-full md:basis-auto text-xs font-bold mt-1 md:mt-0">{windspeedState.windspeed === "kmph" ? "km/h" : "m/s"}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center">
                <div className="w-full md:w-auto flex justify-center">
                    <LazyMotion features={domAnimation}>
                        <m.div 
                            className="w-8 h-8 border-2 border-blue-700 dark:border-sky-400 rounded-full"
                            initial={{ '--rotate': '0deg'} as any}
                            animate={{'--rotate': rotation} as any}
                            transition={{ duration: 2}}
                        >
                            <div 
                                className="w-full h-full flex justify-center items-center"
                                style={{ transform: 'rotate(var(--rotate))' }}
                            >
                                <NavigationIcon classNames="w-5 h-5" />
                            </div>
                        </m.div>
                    </LazyMotion>
                </div>
                <div className="w-full md:w-auto text-center">
                    <p className="text-xs mt-1 md:mt-0 md:ml-1">{t(direction)}</p>
                </div>
            </div>
        </>
    )
}

export default CardWind;