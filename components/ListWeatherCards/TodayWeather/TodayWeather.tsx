'use client'

import Image from "next/image"
import { useTranslations } from "next-intl"
import { useTemperature } from "@/hooks/useTemperature"
import { celsiusToFahrenheit } from "@/utils/celsiusToFahrenheit"
import { getWeatherSvgIconPath } from "@/utils/getWeatherSvgIconPath"
import { OpenMeteoData } from "@/@types/openmeteo"
import { ArrowDownRightIcon } from "@/components/SvgIcons/ArrowDownRightIcon/ArrowDownRightIcon"
import { ArrowUpRightIcon } from "@/components/SvgIcons/ArrowUpRightIcon/ArrowUpRightIcon"

export const TodayWeather = (props: OpenMeteoData) => {

    const {temperatureState, dispatch} = useTemperature();
    const {temperature} = temperatureState;

    const t = useTranslations('LocaleLayout.cards');

    const {current, daily} = props;

    const code = current?.weathercode;

    return (
        <>
            <div className="w-full max-w-lg px-4 py-8 mb-4 rounded-lg text-blue-700 border-2 border-sky-100 dark:text-sky-400 dark:border-sky-400">
                <div className="flex flex-wrap">
                    <div className="flex basis-full">
                        {t.rich('today_weather.title', {
                            h3: (chunks) => <h3>{chunks}</h3>,
                            strong: (chunks) => <strong>{chunks}</strong>
                        })}
                    </div>
                    <div
                        className="mt-8 flex basis-full flex-wrap text-blue-700 dark:text-white"
                    >
                        <div className="flex basis-1/2 flex-col items-center justify-evenly">
                            <h3 className="text-4xl font-bold">
                                {temperature === 'celsius'
                                ? current!.temperature_2m?.toFixed(0)
                                : celsiusToFahrenheit(current!.temperature_2m).toFixed(0)}
                                &deg;
                                {temperature === 'celsius' ? 'C' : 'F'}
                            </h3>

                            <h4 className="mb-2 mt-1 text-sm first-letter:uppercase">
                                {t(`codes.${code}`)}
                            </h4>

                            <div className="w-full flex gap-x-2 justify-center items-center text-xs font-bold">
                                <div className="flex gap-x-1">
                                    <span className="text-blue-300 dark:text-sky-400">
                                        &#9660;{' '}
                                    </span>
                                    <p>
                                        {daily?.temperature_2m_min[0] && typeof daily?.temperature_2m_min[0] == "number" && temperature === "fahrenheit" && celsiusToFahrenheit(daily?.temperature_2m_min[0]).toFixed(0)}
                                        {daily?.temperature_2m_min[0] && typeof daily?.temperature_2m_min[0] == "number" && temperature === "celsius" && daily?.temperature_2m_min[0].toFixed(0)}
                                        &deg;
                                        {temperature === 'celsius' ? 'C' : 'F'}
                                    </p>
                                </div>
                                <div className="flex gap-x-1">
                                    <span className="text-blue-300 dark:text-sky-400">
                                        &#9650;{' '}
                                    </span>
                                    <p>
                                        {daily?.temperature_2m_max[0] && typeof daily?.temperature_2m_max[0] == "number" && temperature === "fahrenheit" && celsiusToFahrenheit(daily?.temperature_2m_max[0]).toFixed(0)}
                                        {daily?.temperature_2m_max[0] && typeof daily?.temperature_2m_max[0] == "number" && temperature === "celsius" && daily?.temperature_2m_max[0].toFixed(0)}
                                        &deg;
                                        {temperature === 'celsius' ? 'C' : 'F'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex basis-1/2 flex-col items-center justify-start">
                            <Image
                                width={80}
                                height={80}
                                src={getWeatherSvgIconPath(code!, current!.is_day, false)}
                                alt="Weather Icon"
                            />
                        </div>
                        <div className="flex basis-full items-center justify-center pt-8">
                            <div className="mr-2 flex flex-col text-xs">
                                <div className="flex">
                                    <div className="w-4">
                                        <ArrowUpRightIcon />
                                    </div>
                                    <span>{t('today_weather.sunrise.title')}</span>
                                </div>
                                <div className="flex">
                                    <div className="w-4">
                                        <ArrowDownRightIcon />
                                    </div>
                                    <span>{t('today_weather.sunset.title')}</span>
                                </div>
                            </div>
                            <div className="flex flex-col text-end text-xs">
                                <span>
                                {t(
                                    'today_weather.sunrise.time',
                                    {
                                    formatDate: new Date(daily!.sunrise[0])
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
                                <span>
                                {t(
                                    'today_weather.sunset.time',
                                    {
                                    formatDate: new Date(daily!.sunset[0])
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}