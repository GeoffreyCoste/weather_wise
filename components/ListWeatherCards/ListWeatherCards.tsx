import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { HourlyWeather } from "./HourlyWeather/HourlyWeather"
import { TodayWeather } from "./TodayWeather/TodayWeather"
import { WeeklyWeather } from "./WeeklyWeather/WeeklyWeather"
import ButtonToggleFavourite from "../ButtonToggleFavourite/ButtonToggleFavourite"
import { getCityById, getWeather } from "@/utils/handleData"
import { ListWeatherCardsTitle } from "./ListWeatherCardsTitle"
import { getCitiesByUserId  } from "@/actions/cityActions"

type Props = {
    cityId: string;
}

export const ListWeatherCards = async ({cityId}: Props) => {

    const session = await getServerSession(authOptions);
    const user = session?.user;

    const favourites = await getCitiesByUserId({id: user?.id, locale: ''});

    const city = await getCityById(cityId);
    const lat = city.latitude;
    const lon = city.longitude;
    const tz = city.timezone;
    const weather = await getWeather(lat, lon, tz);

  return (
    <>
        <div className="relative w-full max-w-lg mx-auto mb-4">
          <ListWeatherCardsTitle {...city} />
          
          {user && favourites && <ButtonToggleFavourite city={city} favourites={favourites} />}
        </div>
        <div id="list-weather-cards" className="w-full">
            <section id="today-weather" className="flex w-full justify-center">
                {city && weather && <TodayWeather {...weather} />}
            </section>
            <section id="hourly-weather" className="flex w-full justify-center">
                {city && weather && <HourlyWeather {...weather} />}
            </section>
            <section id="weekly-weather" className="flex w-full justify-center">
                {city && weather && <WeeklyWeather {...weather} />}
            </section>
        </div>
    </>
  )
}
