'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import moment from 'moment'
import CurrentlyCard from './CurrentlyCard/CurrentlyCard'
import CurrentlyTitle from './CurrentlyCard/CurrentlyTitle'
import DetailsCardsGrid from './DetailsCards/DetailsCardGrid'
import DetailsTitle from './DetailsCards/DetailsTitle'
import HourlyCardsList from './HourlyWeather/HourlyCardsList'
import HourlyTitle from './HourlyWeather/HourlyTitle'
import { OpenMeteoData } from '@/@types/openmeteo'
import { CityData } from '@/@types/api-datas'
import WeeklyTitle from './WeeklyWeather/WeeklyTitle'
import ButtonFilter from '@/components/ButtonFilter/ButtonFilter'
import SelectedDayCard from './SelectedDayCard/SelectedDayCard'
import SelectedDayTitle from './SelectedDayCard/SelectedDayTitle'
import ButtonToggleDisplay from '@/components/ButtonToggleDisplay/ButtonToggleDisplay'
import DayCard from './DayCard/DayCard'

type Props = {
    city: CityData;
    weather: OpenMeteoData | undefined;
    airQuality: any;
    periodicity: string;
}

const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const getNextDays = (startingDayIndex: number, numOfDays: number) => {
    let result: string[] = [];
    console.log('start: ', startingDayIndex);
    for (var i=0; i < numOfDays; i++) {
        let currentIndex = (startingDayIndex+7+i+1) % 7;
        result.push(weekdays[currentIndex]);
    }
    return result;
};

const ForecastsCard = ({city, weather, airQuality, periodicity}: Props) => {
    
    const [days, setDays] = useState(['today', 'tomorrow']);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedDay, setSelectedDay] = useState('today');
    const [showAllDays, setShowAllDays] = useState(true);

    const t = useTranslations('DashboardForecastsPage');

    useEffect(() => {
        
        const indexToday = moment().weekday();
        const indexTomorrow = indexToday + 1;

        const next5Days = getNextDays(indexTomorrow, 5);

        const updatedDays = [...days, ...next5Days];
        setDays(updatedDays);
    }, []);

    useEffect(() => {
        setActiveIndex(days.indexOf(selectedDay));
    }, [selectedDay]);

    return (
        <div className="flex flex-col">
            {periodicity === "daily" ? (
                <>
                    <div className="flex flex-col md:flex-row md:gap-x-4">
                      <div className="basis-1/2 flex flex-col">
                        <CurrentlyTitle />
                        <CurrentlyCard city={city} weather={weather} />
                      </div>
                      <div className="basis-1/2 flex flex-col">
                        <DetailsTitle />
                        <DetailsCardsGrid 
                            weather={weather} 
                            airQuality={airQuality} 
                            dayIndex={0} 
                            isWeeklyBasis={false} 
                        />
                      </div>
                    </div>
                    <HourlyTitle />
                    <HourlyCardsList weather={weather} />
                </>
            ) : (
                <div>
                    <div className="relative flex justify-between">
                        <WeeklyTitle />
                        <ButtonToggleDisplay checked={showAllDays} setChecked={setShowAllDays} />
                    </div>
                    <>
                        {showAllDays ? (
                            <div className="flex flex-col">
                                {weather?.daily?.time && (
                                    <h5 className="text-xs md:text-sm italic my-4">
                                        {t(
                                            'forecastsCard.weekly_weather.details.period',
                                            {
                                                startDate: new Date(weather.daily.time[0]),
                                                endDate: new Date(weather.daily.time[weather.daily.time.length - 1])
                                            },
                                            {
                                            dateTime: {
                                                short: {
                                                    year: 'numeric',
                                                    day: 'numeric',
                                                    month: 'long'
                                                }
                                            }
                                            }
                                        )}
                                    </h5>
                                )}
                                <div className="flex flex-col">
                                    {weather && days.map((day, index) => (
                                        <DayCard 
                                            key={`${index}-27a6d833-792c-4f2b-a3a4-c33eb1b12a4b`} 
                                            day={day}
                                            weather={weather}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex gap-x-2 pt-4 pb-4 snap-x snap-mandatory overflow-x-scroll">
                                    {days.map((day, index) => (
                                        <ButtonFilter 
                                            key={`${index}-27a6d833-792c-4f2b-a3a4-c33eb1b12a4b`} 
                                            activeFilter={selectedDay} 
                                            filter={day} 
                                            message={`forecastsCard.button_days_filter.${day}`} 
                                            namespace="DashboardForecastsPage" 
                                            setActiveFilter={setSelectedDay} 
                                        />
                                    ))}
                                </div>
                                <div className="flex flex-col mt-4">
                                    <SelectedDayTitle index={activeIndex} />
                                    <SelectedDayCard weather={weather} index={activeIndex} />
                                </div>
                            </>
                        )}
                    </>
                    
                </div>
            )}
        </div>
    )
}

export default ForecastsCard;
