'use client'

import Image from "next/image"
import { LazyMotion, m, domAnimation } from "framer-motion"
import { useTranslations } from "next-intl"
import { OpenMeteoData } from "@/@types/openmeteo"
import { useTemperature } from "@/hooks/useTemperature"
import { useWindspeed } from "@/hooks/useWindspeed"
import { celsiusToFahrenheit } from "@/utils/celsiusToFahrenheit"
import { getWeatherSvgIconPath } from "@/utils/getWeatherSvgIconPath"
import { getWindDirection, getWindIconRotationClass } from "@/utils/getWindInfos"
import { setRiskLevel } from "@/utils/setRiskLevel"
import { ArrowUpRightIcon } from "@/components/SvgIcons/ArrowUpRightIcon/ArrowUpRightIcon"
import { ArrowDownRightIcon } from "@/components/SvgIcons/ArrowDownRightIcon/ArrowDownRightIcon"
import AnimatedCounter from "@/components/AnimatedCounter/AnimatedCounter"
import CircularChart from "@/components/CircularChart/CircularChart"
import { kmphToMps } from "@/utils/kmphToMps"
import NavigationIcon from "@/components/SvgIcons/NavigationIcon/NavigationIcon"


type Props = {
    weather: OpenMeteoData | undefined;
    index: number;
}

const SelectedDayCard = ({weather, index}: Props) => {

    const {temperatureState, dispatch} = useTemperature();
    const {temperature} = temperatureState;

    const {windspeedState} = useWindspeed();
    const {windspeed} = windspeedState;

    const t = useTranslations('DashboardForecastsPage');

    const rotation = getWindIconRotationClass(getWindDirection(weather!.daily!.winddirection_10m_dominant[index]));

    return (
        <div className="w-full px-4 py-8 mb-4 rounded-lg text-blue-700 bg-white dark:text-white dark:bg-blue-950">
            <div className="w-full h-[750px] lg:h-auto flex flex-col lg:flex-row">

                <div className="basis-full lg:basis-1/2 flex flex-col">

                    <div className="w-full flex flex-col flex-1 lg:flex-row">
                        
                        <div className="basis-40 lg:basis-1/2">
                            <div className="flex flex-col lg:h-full justify-center items-center">
                                {weather && (
                                    <Image
                                        width={80}
                                        height={80}
                                        src={getWeatherSvgIconPath(weather!.daily!.weathercode[index], 0, true)}
                                        alt="Weather Icon"
                                        priority
                                    />
                                )}
                                {weather && <span className="text-xs md:text-sm text-center">{t(`weathercodes.${weather!.daily!.weathercode[index]}`)}</span>}
                            </div>
                        </div>

                        <div className="basis-40 lg:basis-1/2 flex flex-col justify-center items-center lg:flex-row ">

                            <div className="basis-full lg:basis-auto flex flex-col">
                                <div className="w-full flex justify-center items-end">
                                    <span className="w-4 text-center text-blue-300 dark:text-sky-400">&#9650;</span>
                                    <div className="w-16 text-right">
                                        <p className="text-blue-700 dark:text-white font-extrabold text-3xl">
                                            {temperature === 'celsius'
                                                ? weather!.daily!.temperature_2m_max[index].toFixed(0)
                                                : celsiusToFahrenheit(weather!.daily!.temperature_2m_max[index]).toFixed(
                                                    0
                                                )}
                                            &deg;
                                            {temperature === 'celsius' ? 'C' : 'F'}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full flex justify-center items-start">
                                    <span className="w-4 text-center text-blue-300 dark:text-sky-400">&#9660;</span>
                                    <div className="w-16 text-right">
                                        <p className="text-blue-700 dark:text-white font-extrabold text-3xl">
                                            {temperature === 'celsius'
                                                ? weather!.daily!.temperature_2m_min[index].toFixed(0)
                                                : celsiusToFahrenheit(weather!.daily!.temperature_2m_min[index]).toFixed(
                                                    0
                                                )}
                                            &deg;
                                            {temperature === 'celsius' ? 'C' : 'F'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="basis-full lg:basis-1/3 flex items-center lg:flex-col gap-x-2 lg:gap-x-0 relative">
                                <span className="absolute left-1/2 -translate-x-1/2 top-2 lg:-top-5 lg:left-3 lg:translate-x-0 text-xs font-semibold text-blue-400 dark:text-sky-400 dark:text-sky-400 whitespace-nowrap">{t('forecastsCard.weekly_weather.details.selected_day_card.feelsLike')}</span>
                                <div className="w-full flex justify-center items-center gap-x-1 lg:gap-x-0">
                                    <span className="w-4 text-center text-blue-300 dark:text-sky-400">&#9650;</span>
                                    <div className="lg:w-9 lg:text-right">
                                        <p className="text-blue-700 dark:text-white font-bold text-xs lg:pb-1">
                                            {temperature === 'celsius'
                                                ? weather!.daily!.apparent_temperature_max[index].toFixed(0)
                                                : celsiusToFahrenheit(weather!.daily!.apparent_temperature_max[index]).toFixed(
                                                    0
                                                )}
                                            &deg;
                                            {temperature === 'celsius' ? 'C' : 'F'}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full flex justify-center items-center gap-x-1 lg:gap-x-0">
                                    <span className="w-4 text-center text-blue-300 dark:text-sky-400">&#9660;</span>
                                    <div className="lg:w-9 lg:text-right">
                                        <p className="text-blue-700 dark:text-white font-bold text-xs lg:pt-1">
                                            {temperature === 'celsius'
                                                ? weather!.daily!.apparent_temperature_min[index].toFixed(0)
                                                : celsiusToFahrenheit(weather!.daily!.apparent_temperature_min[index]).toFixed(
                                                    0
                                                )}
                                            &deg;
                                            {temperature === 'celsius' ? 'C' : 'F'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="w-full h-10 flex flex-col lg:flex-row lg:items-end">
                        <div className="basis-full lg:basis-1/2 flex justify-center items-center text-xs">
                            <div className="w-4">
                                <ArrowUpRightIcon />
                            </div>
                            <div className="w-24">
                                {t('forecastsCard.current_weather.sunrise.title')}
                            </div>
                            <div className="w-12 text-right">
                                {t(
                                    'forecastsCard.current_weather.sunrise.time',
                                    {
                                    formatDate: new Date(weather!.daily!.sunrise[index])
                                    },
                                    {
                                    dateTime: {
                                        short: {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        },
                                    }
                                    }
                                )}
                            </div>
                        </div>
                        <div className="basis-full lg:basis-1/2 flex justify-center items-center text-xs">
                            <div className="w-4">
                                <ArrowDownRightIcon />
                            </div>
                            <div className="w-24">
                                {t('forecastsCard.current_weather.sunset.title')}
                            </div>
                            <div className="w-12 text-right">
                                {t(
                                    'forecastsCard.current_weather.sunset.time',
                                    {
                                    formatDate: new Date(weather!.daily!.sunset[index])
                                    },
                                    {
                                    dateTime: {
                                        short: {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        }
                                    }
                                    }
                                )}
                            </div>
                        </div>
                    </div>

                </div>

                <div className="basis-full lg:basis-1/2 flex flex-col lg:flex-row">
                    <div className="basis-full lg:basis-1/2 flex flex-col justify-center items-center lg:mb-10 lg:px-4 ">
                        <div className="w-full lg:h-52 flex flex-col items-center p-4 lg:border-2 lg:border-blue-300 lg:dark:border-sky-400 rounded-lg">
                            <h4 className="basis-full w-full lg:basis-auto text-sm text-center text-blue-400 dark:text-sky-400 font-bold mb-4 lg:mb-0 pt-6 lg:pt-0 border-t-2 border-blue-100 dark:border-blue-900 lg:border-none">{t('forecastsCard.weekly_weather.details.selected_day_card.cards.wind.title')}</h4>
                            <div className="basis-full flex flex-wrap items-end text-center mb-4 lg:my-6">
                                <AnimatedCounter 
                                from={0} 
                                to={windspeed === "kmph" ? weather!.daily!.windspeed_10m_max[index] : kmphToMps(weather!.daily!.windspeed_10m_max[index])}
                                afterDecimal={1} 
                                classNames={"basis-full md:basis-auto text-3xl font-bold md:mr-2 leading-none"} />
                                <p className="basis-full md:basis-auto text-xs font-bold mt-1 md:mt-0">{windspeed === "kmph" ? "km/h" : "m/s"}</p>
                            </div>
                            <div className="basis-full flex flex-wrap items-end justify-center">
                                <div className="basis-full md:w-auto flex justify-center">
                                    <LazyMotion features={domAnimation}>
                                        <m.div 
                                            className="w-8 h-8 border-2 border-blue-700 dark:border-sky-400 rounded-full"
                                            initial={{ '--rotate': '0deg'} as any}
                                            animate={{'--rotate': rotation} as any}
                                            transition={{ duration: 2}}
                                        >
                                            <div 
                                                className="w-full h-full flex justify-center items-center"
                                                style={{ transform: 'rotate(var(--rotate))'}}
                                            >
                                                <NavigationIcon classNames="w-5 h-5" />
                                            </div>
                                        </m.div>
                                    </LazyMotion>
                                </div>
                                <div className="w-full md:w-auto text-center">
                                    <p className="text-xs mt-1 md:mt-0">{t(`forecastsCard.weekly_weather.details.selected_day_card.cards.wind.direction.${getWindDirection(weather!.daily!.winddirection_10m_dominant[index])}`)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="basis-full lg:basis-1/2 flex flex-col justify-center items-center lg:mb-10 lg:px-4">
                        <div className="w-full lg:h-52 flex flex-col items-center justify-between p-4 lg:border-2 lg:border-blue-300 lg:dark:border-sky-400 rounded-lg">
                            <h4 className="w-full text-sm text-center text-blue-400 dark:text-sky-400 font-bold mb-4 lg:mb-0 pt-6 lg:pt-0 border-t-2 border-blue-100 dark:border-blue-900 lg:border-none">{t('forecastsCard.details_weather.cards.uv.title')}</h4>
                            <CircularChart value={Math.floor(weather!.daily!.uv_index_max[index])} />
                            <span className="text-xs mt-4 lg:mt-0">{t(`forecastsCard.weekly_weather.details.selected_day_card.cards.uv.desc.${setRiskLevel(weather!.daily!.uv_index_max[index])}`)}</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default SelectedDayCard;