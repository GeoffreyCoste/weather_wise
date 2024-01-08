'use client'

import Image from "next/image"
import { useTranslations } from "next-intl"
import { useTemperature } from "@/hooks/useTemperature"
import { celsiusToFahrenheit } from "@/utils/celsiusToFahrenheit"
import { getWeatherSvgIconPath } from "@/utils/getWeatherSvgIconPath"
import { OpenMeteoData } from "@/@types/openmeteo"

export const WeeklyWeather = (props: OpenMeteoData) => {

  const {temperatureState, dispatch} = useTemperature();
  const {temperature} = temperatureState;

  const t = useTranslations('LocaleLayout.cards');

  const {current, daily} = props;

  return (
    <>
        <div className="w-full max-w-lg px-4 py-8 mb-4 rounded-lg text-blue-700 bg-sky-100 dark:text-white dark:bg-[#0F1A3E]">
          {t.rich('weekly_weather.title', {
            h3: (chunks) => <h3>{chunks}</h3>,
            strong: (chunks) => <strong>{chunks}</strong>
          })}
          <div className="z-10 mt-4 flex w-full snap-x snap-mandatory flex-nowrap justify-between overflow-x-scroll md:flex-wrap md:overflow-auto pb-4">
            {daily && daily.time.length > 0 &&
              daily.time.map((d, index: number) => {
                const code = daily.weathercode[index];
                return (
                  <div
                    key={`${index}-53048a96-2343-4062-b420-fc1c8731236f`}
                    className="flex flex-col w-36 md:w-full bg-white text-blue-700 dark:bg-blue-950 dark:text-white mr-2 snap-start rounded-lg p-2 md:mb-4 md:mr-0 md:p-4"
                  >
                    <h3
                      className={`basis-full text-xs md:text-sm text-center md:text-left ${
                        index === 0 || index === 1 ? 'font-bold' : 'font-medium'
                      }`}
                    >
                      {index === 0
                        ? t('weekly_weather.today')
                        : index === 1
                        ? t('weekly_weather.tomorrow')
                        : t(
                            'weekly_weather.date',
                            {
                              formatDate: new Date(d)
                            },
                            {
                              dateTime: {
                                short: {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                }
                              }
                            }
                          )}
                    </h3>
                    <div className="flex w-20 flex-col items-center justify-end md:w-full md:flex-row md:flex-wrap">
                      <div className="hidden md:flex flex-col basis-1/3">
                        <h4 className="mb-2 text-sm font-bold first-letter:uppercase">
                          {t(`codes.${code}`)}
                        </h4>
                        <div className="text-xs">
                          <span className="mr-1">
                            &#9660;{' '}
                            {daily?.temperature_2m_min[0] && typeof daily?.temperature_2m_min[index] == "number" && temperature == "celsius" &&  daily?.temperature_2m_min[index].toFixed(0)}

                            {daily?.temperature_2m_min[0] && typeof daily?.temperature_2m_min[index] == "number" && temperature == "fahrenheit" &&  celsiusToFahrenheit(daily?.temperature_2m_min[index]).toFixed(0)}

                            &deg;{temperature === 'celsius' ? 'C' : 'F'}
                          </span>
                          <span>
                            &#9650;{' '}
                            {daily?.temperature_2m_max[0] && typeof daily?.temperature_2m_max[index] == "number" && temperature == "celsius" &&  daily?.temperature_2m_max[index].toFixed(0)}

                            {daily?.temperature_2m_max[0] && typeof daily?.temperature_2m_max[index] == "number" && temperature == "fahrenheit" &&  celsiusToFahrenheit(daily?.temperature_2m_max[index]).toFixed(0)}

                            &deg;{temperature === 'celsius' ? 'C' : 'F'}
                          </span>
                        </div>
                      </div>
                      <div className="basis-1/3 flex items-center">
                        <Image
                          className="my-2 scale-50 md:my-0 md:mr-8 md:scale-100"
                          width={100}
                          height={100}
                          src={getWeatherSvgIconPath(code, 1, true)}
                          alt="Weather Icon"
                        />
                      </div>
                      <div className="flex text-center text-xs font-medium md:hidden">
                        <div className="flex flex-col">
                          <span>&#9650; </span>
                          <span>&#9660; </span>
                        </div>
                        <div className="flex flex-col">
                          <span>
                            {daily?.temperature_2m_min[0] && typeof daily?.temperature_2m_min[index] == "number" && temperature == "celsius" &&  daily?.temperature_2m_min[index].toFixed(0)}

                            {daily?.temperature_2m_min[0] && typeof daily?.temperature_2m_min[index] == "number" && temperature == "fahrenheit" &&  celsiusToFahrenheit(daily?.temperature_2m_min[index]).toFixed(0)}
                            &deg;{temperature === 'celsius' ? 'C' : 'F'}
                          </span>
                          <span>
                            {daily?.temperature_2m_max[0] && typeof daily?.temperature_2m_max[index] == "number" && temperature == "celsius" &&  daily?.temperature_2m_max[index].toFixed(0)}

                            {daily?.temperature_2m_max[0] && typeof daily?.temperature_2m_max[index] == "number" && temperature == "fahrenheit" &&  celsiusToFahrenheit(daily?.temperature_2m_max[index]).toFixed(0)}
                            &deg;{temperature === 'celsius' ? 'C' : 'F'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
    </>
  )
}