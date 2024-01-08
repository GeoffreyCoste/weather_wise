'use client'

import Image from "next/image"
import moment from "moment-timezone"
import { useTranslations } from "next-intl"
import { CityData } from "@/@types/api-datas"
import { OpenMeteoData } from "@/@types/openmeteo"
import { useTemperature } from "@/hooks/useTemperature"
import { celsiusToFahrenheit } from "@/utils/celsiusToFahrenheit"
import { getWeatherSvgIconPath } from "@/utils/getWeatherSvgIconPath"
import { ClockIcon } from "@/components/SvgIcons/ClockIcon/ClockIcon"
import { ArrowUpRightIcon } from "@/components/SvgIcons/ArrowUpRightIcon/ArrowUpRightIcon"
import { ArrowDownRightIcon } from "@/components/SvgIcons/ArrowDownRightIcon/ArrowDownRightIcon"

type Props = {
    city: Partial<CityData>;
    weather: OpenMeteoData | undefined;
}

const CurrentlyCard = ({city, weather}: Props) => {

    const {temperatureState, dispatch} = useTemperature();
    const {temperature} = temperatureState;

    const t = useTranslations('DashboardForecastsPage');

  return (
    <div className="w-full max-w-lg px-4 py-8 mb-4 rounded-lg text-blue-700 bg-white dark:text-white dark:bg-blue-950">
        <div className="flex justify-end items-center">
            <ClockIcon />
            <p className="text-xs ml-1">
                {city.timezone && moment.tz(moment(), city.timezone).format('HH:mm')}
            </p>
        </div>
        <div className="flex justify-center gap-x-6 md:gap-x-10 my-8">
            <div className="flex flex-col justify-end items-center">
                <h5 className="h-[60px] text-4xl font-bold">
                    {weather?.current?.temperature_2m && temperature === 'celsius' && weather.current.temperature_2m.toFixed(0)}

                    {weather?.current?.temperature_2m && temperature === 'fahrenheit' && celsiusToFahrenheit(weather.current.temperature_2m).toFixed(0)}

                    &deg;
                    {temperature === 'celsius' ? 'C' : 'F'}
                </h5>
                <span className="text-xs md:text-sm text-center font-bold text-blue-400 dark:text-gray-300">
                    {t('forecastsCard.current_weather.feelsLike')}

                    {weather?.current?.apparent_temperature && temperature === 'celsius' && weather.current.apparent_temperature.toFixed(0)}

                    {weather?.current?.apparent_temperature && temperature === 'fahrenheit' && weather.current.apparent_temperature.toFixed(0)}

                    &deg;
                    {temperature === 'celsius' ? 'C' : 'F'}
                </span>
            </div>
            <div className="flex flex-col justify-end items-center">
                {weather?.current && (
                    <Image
                      width={60}
                      height={60}
                      src={getWeatherSvgIconPath(weather.current.weathercode, weather.current.is_day, false)}
                      alt="Home Icon"
                      priority
                    />
                )}
                {weather?.current && <span className="text-xs md:text-sm text-center font-bold text-blue-400 dark:text-gray-300">{t(`weathercodes.${weather.current.weathercode}`)}</span>}
            </div>
        </div>
        <div className="w-full flex gap-x-2 justify-center items-center my-8 md:mt-14 md:mb-10 text-xs font-bold">
            <div className="flex gap-x-1">
                <span className="text-blue-300 dark:text-sky-400">
                    &#9660;{' '}
                </span>
                <p>
                    {weather?.daily?.temperature_2m_min[0] && temperature === "celsius" && weather?.daily?.temperature_2m_min[0].toFixed(0)}

                    {weather?.daily?.temperature_2m_min[0] && temperature === "fahrenheit" && celsiusToFahrenheit(weather?.daily?.temperature_2m_min[0]).toFixed(0)}

                    &deg;
                    {temperature === 'celsius' ? 'C' : 'F'}
                </p>
            </div>
            <div className="flex gap-x-1">
                <span className="text-blue-300 dark:text-sky-400">
                    &#9650;{' '}
                </span>
                <p>
                    {weather?.daily?.temperature_2m_max[0] && temperature === "celsius" && weather?.daily?.temperature_2m_max[0].toFixed(0)}

                    {weather?.daily?.temperature_2m_max[0] && temperature === "fahrenheit" && celsiusToFahrenheit(weather?.daily?.temperature_2m_max[0]).toFixed(0)}

                    &deg;
                    {temperature === 'celsius' ? 'C' : 'F'}
                </p>
            </div>
        </div>
        <div className="flex flex-col md:flex-row items-center md:justify-between mt-10">
            <div className="flex">
                <div className="w-4">
                    <ArrowUpRightIcon />
                </div>
                {weather?.daily?.sunrise[0] && (
                    <span className="text-xs">
                        {t('forecastsCard.current_weather.sunrise.title')}
                        {t(
                            'forecastsCard.current_weather.sunrise.time',
                            {
                            formatDate: new Date(weather.daily.sunrise[0])
                            },
                            {
                            dateTime: {
                                short: {
                                hour: 'numeric',
                                minute: 'numeric'
                                }
                            }
                            }
                        )}
                    </span>
                )}
            </div>
            <div className="flex">
                <div className="w-4">
                    <ArrowDownRightIcon />
                </div>
                {weather?.daily?.sunset[0] && (
                    <span className="text-xs">
                        {t('forecastsCard.current_weather.sunset.title')}
                        {t(
                            'forecastsCard.current_weather.sunset.time',
                            {
                            formatDate: new Date(weather.daily.sunset[0])
                            },
                            {
                            dateTime: {
                                short: {
                                hour: 'numeric',
                                minute: 'numeric'
                                }
                            }
                            }
                        )}
                    </span>
                )}
            </div>
        </div>
    </div>
  )
}

export default CurrentlyCard;