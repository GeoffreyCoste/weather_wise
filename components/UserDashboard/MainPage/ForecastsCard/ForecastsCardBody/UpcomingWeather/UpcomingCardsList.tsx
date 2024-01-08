'use client'

import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"
import { useTemperature } from "@/hooks/useTemperature"
import { celsiusToFahrenheit } from "@/utils/celsiusToFahrenheit"
import { getWeatherSvgIconPath } from "@/utils/getWeatherSvgIconPath"
import { OpenMeteoData } from "@/@types/openmeteo"

type Props = {
    weather: OpenMeteoData | undefined;
}

const UpcomingCardsList = ({weather}: Props) => {

    const {temperatureState, dispatch} = useTemperature();
    const {temperature} = temperatureState;

    const t = useTranslations('DashboardMainPage');

    const locale = useLocale();

    let boolean = locale === 'en' ? true : false;

    const current = weather?.current;
    const hourly = weather?.hourly;

    // Make sure that 'current.time' has minutes set to "00"
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
      // Gather inside time array the 24 hours as from current time index + 1
      timeSlice = hourly.time.slice((currentTimeIndex + 1), (currentTimeIndex + 1) + 24);
    }


    return (
      <ul className="z-10 mt-4 flex w-full snap-x snap-mandatory flex-nowrap justify-between overflow-x-scroll md:overflow-x-auto pb-4">
        {hourly && timeSlice && timeSlice?.length === 24 &&
              timeSlice.map((h, index: number) => (
                <li
                  key={`${index}-cd8718f3-4cec-4c54-b095-fde7b2b62c4c`}
                  className="flex items-center justify-center bg-white text-blue-700 dark:bg-blue-950 dark:text-white mr-2 snap-start rounded-lg p-2"
                >
                  <div className="flex w-20 flex-col items-center justify-between text-xs">
                    <span className="font-medium">
                        {t(
                            'forecastsCard.upcoming_weather.time',
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
                        hourly.weathercode[index + currentTimeIndex + 1],
                        hourly.is_day[index + currentTimeIndex + 1],
                        false
                      )}
                      alt="Weather Icon"
                    />
                    <span className="text-xs font-bold">
                      {temperature === 'celsius'
                        ? hourly.temperature_2m[index + currentTimeIndex + 1].toFixed(0)
                        : celsiusToFahrenheit(
                            hourly.temperature_2m[index + currentTimeIndex + 1]
                          ).toFixed(0)}
                      &deg;{temperature === 'celsius' ? 'C' : 'F'}
                    </span>
                  </div>
                </li>
            ))}
      </ul>
    )
}

export default UpcomingCardsList;