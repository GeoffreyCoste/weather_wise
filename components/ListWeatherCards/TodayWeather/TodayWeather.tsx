'use client'

import Image from "next/image";
import { CardLayout } from "@/components/CardLayout/CardLayout";
import { CityInterface } from "../ListWeatherCards";
import { CurrentWeatherInterface, DailyInterface } from "@/@types/openmeteo";
import { useTranslations } from "next-intl";
import { useTheme } from "@/hooks/useTheme";
import { useTemperature } from "@/hooks/useTemperature";
import { celsiusToFahrenheit } from "@/utils/celsiusToFahrenheit";
import { getWeatherSvgIconPath } from "@/utils/getWeatherSvgIconPath";

interface TodayWeatherInterface {
    city: Partial<CityInterface>;
    current: CurrentWeatherInterface;
    daily: DailyInterface;
  }

export const TodayWeather = ({city, current, daily}: TodayWeatherInterface) => {

    const {temperatureState, dispatch} = useTemperature();
    const {temperature} = temperatureState;

    const t = useTranslations('LocaleLayout.cards');

    const code = current.weathercode;

    return (
        <>
            <CardLayout background={false}>
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
                                ? current.temperature.toFixed(0)
                                : celsiusToFahrenheit(current.temperature).toFixed(0)}
                                &deg;
                                {temperature === 'celsius' ? 'C' : 'F'}
                            </h3>

                            <h4 className="mb-2 mt-1 text-sm first-letter:uppercase">
                                {t(`codes.${code}`)}
                            </h4>

                            <div className="text-xs">
                                <span className="mr-1">
                                    &#9660;{' '}
                                    {temperature === 'celsius'
                                        ? daily.temperature_2m_min[0].toFixed(0)
                                        : celsiusToFahrenheit(daily.temperature_2m_min[0]).toFixed(
                                            0
                                        )}
                                    &deg;
                                    {temperature === 'celsius' ? 'C' : 'F'}
                                </span>
                                <span>
                                    &#9650;{' '}
                                    {temperature === 'celsius'
                                        ? daily.temperature_2m_max[0].toFixed(0)
                                        : celsiusToFahrenheit(daily.temperature_2m_max[0]).toFixed(
                                            0
                                        )}
                                    &deg;
                                    {temperature === 'celsius' ? 'C' : 'F'}
                                </span>
                            </div>
                            </div>
                            <div className="flex basis-1/2 flex-col items-center justify-start">
                            <Image
                                width={80}
                                height={80}
                                src={getWeatherSvgIconPath(code, current.is_day, false)}
                                alt="Weather Icon"
                            />
                            </div>
                            <div className="flex basis-full items-center justify-center pt-8">
                            <div className="mr-2 flex flex-col text-xs">
                                <span>{t('today_weather.sunrise.title')}</span>
                                <span>{t('today_weather.sunset.title')}</span>
                            </div>
                            <div className="flex flex-col text-end text-xs">
                                <span>
                                {t(
                                    'today_weather.sunrise.time',
                                    {
                                    formatDate: new Date(daily.sunrise[0])
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
                                    formatDate: new Date(daily.sunset[0])
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
            </CardLayout>
        </>
    )
}

{/* <section id="today-weather" className="flex w-full justify-center"> */}
{/* </section> */}