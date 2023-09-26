'use client'

import Image from "next/image";
import { CardLayout } from "@/components/CardLayout/CardLayout"
import { useTranslations } from "next-intl";
import { useTemperature } from "@/hooks/useTemperature";
import { celsiusToFahrenheit } from "@/utils/celsiusToFahrenheit";
import { getWeatherSvgIconPath } from "@/utils/getWeatherSvgIconPath";

interface WeeklyWeatherInterface {
  daily: {
    sunrise: Date[];
    sunset: Date[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    time: Date[];
    uv_index_max: number[];
    weathercode: number[];
  };
};

export const WeeklyWeather = ({daily}: WeeklyWeatherInterface) => {

  const {temperatureState, dispatch} = useTemperature();
  const {temperature} = temperatureState;

  const t = useTranslations('LocaleLayout.cards');

  return (
    <>
        <CardLayout background={true}>
          {t.rich('weekly_weather.title', {
            h3: (chunks) => <h3>{chunks}</h3>,
            strong: (chunks) => <strong>{chunks}</strong>
          })}
          <div className="z-10 mt-4 flex w-full snap-x snap-mandatory flex-nowrap justify-between overflow-x-scroll md:flex-wrap md:overflow-auto">
            {daily.time.length > 0 &&
              daily.time.map((d, index: number) => {
                const code = daily.weathercode[index];
                return (
                  <div
                    key={`${index}-53048a96-2343-4062-b420-fc1c8731236f`}
                    className="flex w-36 md:w-full bg-white text-blue-700 dark:bg-blue-950 dark:text-white mr-2 snap-start rounded-lg p-2 md:mb-4 md:mr-0 md:p-4"
                  >
                    <div className="flex w-20 flex-col items-center justify-between md:w-full md:flex-row md:flex-wrap">
                      <h3
                        className={`text-xs md:basis-full md:text-sm ${
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
                      <div className="ml-44 hidden md:flex flex-col">
                        <h4 className="mb-2 text-sm font-bold first-letter:uppercase">
                          {t(`codes.${code}`)}
                        </h4>
                        <div className="text-xs">
                          <span className="mr-1">
                            &#9660;{' '}
                            {temperature === 'celsius'
                              ? daily.temperature_2m_min[index].toFixed(0)
                              : celsiusToFahrenheit(
                                  daily.temperature_2m_min[index]
                                ).toFixed(0)}
                            &deg;{temperature === 'celsius' ? 'C' : 'F'}
                          </span>
                          <span>
                            &#9650;{' '}
                            {temperature === 'celsius'
                              ? daily.temperature_2m_max[index].toFixed(0)
                              : celsiusToFahrenheit(
                                  daily.temperature_2m_max[index]
                                ).toFixed(0)}
                            &deg;{temperature === 'celsius' ? 'C' : 'F'}
                          </span>
                        </div>
                      </div>
                      

                      <Image
                        className="my-2 scale-50 md:my-0 md:mr-8 md:scale-100"
                        width={100}
                        height={100}
                        src={getWeatherSvgIconPath(code, 1, true)}
                        alt="Weather Icon"
                      />
                      <div className="flex text-center text-xs font-medium md:hidden">
                        <div className="flex flex-col">
                          <span>&#9650; </span>
                          <span>&#9660; </span>
                        </div>
                        <div className="flex flex-col">
                          <span>
                            {temperature === 'celsius'
                              ? daily.temperature_2m_min[index].toFixed(0)
                              : celsiusToFahrenheit(
                                  daily.temperature_2m_min[index]
                                ).toFixed(0)}
                            &deg;{temperature === 'celsius' ? 'C' : 'F'}
                          </span>
                          <span>
                            {temperature === 'celsius'
                              ? daily.temperature_2m_max[index].toFixed(0)
                              : celsiusToFahrenheit(
                                  daily.temperature_2m_max[index]
                                ).toFixed(0)}
                            &deg;{temperature === 'celsius' ? 'C' : 'F'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardLayout>
    </>
  )
}