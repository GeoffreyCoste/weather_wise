'use client'

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl"
import { useTemperature } from "@/hooks/useTemperature"
import { celsiusToFahrenheit } from "@/utils/celsiusToFahrenheit"
import { getWeatherSvgIconPath } from "@/utils/getWeatherSvgIconPath"
import { OpenMeteoData } from "@/@types/openmeteo";


export const HourlyWeather = (props: OpenMeteoData) => {

  const {temperatureState, dispatch} = useTemperature();
  const {temperature} = temperatureState;

  const t = useTranslations('LocaleLayout.cards');

  const locale = useLocale();

  let boolean = locale === 'en' ? true : false;

  const {current, hourly} = props;

  // Make sure that currentTime has minutes set to "00"
  const roundedTime = (timeStr: string) => {
    let arr = timeStr.split('');
    arr[arr.length - 2] = '0';
    return arr.join('');
  };

  let currentTimeIndex: number;
  let timeSlice;

  if (hourly?.time && hourly?.time.length && current?.time) {
    // Finding index of currentTime inside time array property of hourly
    currentTimeIndex = hourly.time.indexOf(roundedTime(current.time));
    // Gather inside time array the 24 hours as from current time index
    timeSlice = hourly?.time.slice(currentTimeIndex, currentTimeIndex + 24);
  }


  return (
    <>
        <div className="w-full max-w-lg px-4 py-8 mb-4 rounded-lg text-blue-700 bg-sky-100 dark:text-white dark:bg-[#0F1A3E]">
          {t.rich('hourly_weather.title', {
            h3: (chunks) => <h3>{chunks}</h3>,
            strong: (chunks) => <strong>{chunks}</strong>
          })}
          <div className="z-10 mt-4 flex w-full snap-x snap-mandatory flex-nowrap justify-between overflow-x-scroll md:overflow-x-auto pb-4">
            {hourly && timeSlice && timeSlice.length === 24 &&
              timeSlice.map((h, index: number) => (
                <div
                  key={`${index}-98f7229d-24fc-4ed3-ba91-2fe8b2d69b7ae`}
                  className="flex items-center justify-center bg-white text-blue-700 dark:bg-blue-950 dark:text-white mr-2 snap-start rounded-lg p-2"
                >
                  <div className="flex w-20 flex-col items-center justify-between text-xs">
                    <span className={index === 0 ? 'font-bold' : 'font-medium'}>
                      {index == 0
                        ? t('hourly_weather.now')
                        : t(
                            'hourly_weather.time',
                            {
                              formatDate: new Date(h)
                            },
                            {
                              dateTime: {
                                short: {
                                  hour: 'numeric',
                                  minute: 'numeric',
                                  hour12: boolean
                                }
                              }
                            }
                          )}
                    </span>
                    <Image
                      className="my-2 scale-50 md:my-4 md:scale-100"
                      width={100}
                      height={100}
                      src={getWeatherSvgIconPath(
                        hourly.weathercode[index + currentTimeIndex],
                        hourly.is_day[index + currentTimeIndex],
                        false
                      )}
                      alt="Weather Icon"
                    />
                    <span className="text-xs font-bold">

                      {hourly?.temperature_2m[index + currentTimeIndex] && typeof hourly?.temperature_2m[index + currentTimeIndex] == "number" && temperature === 'celsius' && hourly?.temperature_2m[index + currentTimeIndex].toFixed(0)}

                      {hourly?.temperature_2m[index + currentTimeIndex] && typeof hourly?.temperature_2m[index + currentTimeIndex] == "number" && temperature === 'fahrenheit' && celsiusToFahrenheit(hourly?.temperature_2m[index + currentTimeIndex]).toFixed(0)}

                      &deg;{temperature === 'celsius' ? 'C' : 'F'}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
    </>
  )
}