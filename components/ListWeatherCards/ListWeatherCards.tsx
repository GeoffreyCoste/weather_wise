import { HourlyWeather } from "./HourlyWeather/HourlyWeather"
import { TodayWeather } from "./TodayWeather/TodayWeather"
import { WeeklyWeather } from "./WeeklyWeather/WeeklyWeather"
import { OpenmeteoInterface } from "@/@types/openmeteo"

type Props = {
    cityId: string;
}

export interface CityInterface {
    id: string;
    name: string;
    state: string;
    country: string;
    coord: {lon: number; lat: number};
    timezone: string;
    /* slug?: string; */
}

const getCity = async (id: string): Promise<CityInterface | undefined> => {
  try {
      const response = await fetch(`http://localhost:3000/api/city/${id}`);

      const json = await response.json();

      const city: CityInterface = {
          id: id,
          name: json.name,
          state: '',
          country: json._links['city:country'].name,
          coord: {
            lon: json.location.latlon.longitude,
            lat: json.location.latlon.latitude
          },
          timezone: json._links['city:timezone'].name,
      };

      return city;
  } catch (error) {
      console.log(error);
  }
};

const getWeather = async (lat: number, lon: number, tz: string): Promise<OpenmeteoInterface | undefined> => {
  try {
      const response = await fetch(`http://localhost:3000/api/weather?lat=${lat}&lon=${lon}&tz=${tz}`);

      const weather = await response.json();

      return weather;

  } catch (error) {
      console.log(error);
  }
};

export const ListWeatherCards = async ({cityId}: Props) => {

    const city = await getCity(cityId);
    let lat: number | undefined;
    let lon: number | undefined ;
    let timezone: string | undefined;
    let weather: OpenmeteoInterface | undefined;

    if (city) {
      lat = city?.coord.lat;
      lon = city?.coord.lon;
      timezone = city?.timezone;

      weather = await getWeather(lat, lon, timezone);
    };

  return (
    <>
        <h2
          className="mb-4 text-center text-2xl font-black text-blue-700 dark:text-white"
        >
          {city?.name} <br />({city?.country})
        </h2>
        <div id="list-weather-cards" className="w-full">
            <section id="today-weather" className="flex w-full justify-center">
                {city && weather && <TodayWeather city={city} current={weather?.current_weather} daily={weather?.daily} />}
            </section>
            <section id="hourly-weather" className="flex w-full justify-center">
                {city && weather && <HourlyWeather currentTime={weather?.current_weather.time} hourly={weather.hourly} />}
            </section>
            <section id="weekly-weather" className="flex w-full justify-center">
                {city && weather && <WeeklyWeather daily={weather?.daily} />}
            </section>
        </div>
    </>
  )
}
