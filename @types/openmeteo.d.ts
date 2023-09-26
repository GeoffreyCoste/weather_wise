export interface DailyInterface {
    time: Date[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: Date[];
    sunset: Date[];
    uv_index_max: number[];
    weathercode: number[];
  }
  
  interface DailyUnitsInterface {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    sunrise: string;
    sunset: string;
    uv_index_max: string;
    weathercode: string;
  }
  
  export interface HourlyInterface {
    time: string[];
    temperature_2m: number[];
    apparent_temperature: number[];
    windspeed_10m: number[];
    precipitation: number[];
    precipitation_probability: number[];
    is_day: number[];
    weathercode: number[];
  }
  
  interface HourlyUnitsInterface {
    time: string;
    temperature_2m: string;
    apparent_temperature: string;
    windspeed_10m: string;
    precipitation: string;
    precipitation_probability: string;
    is_day: string;
    weathercode: string;
  }
  
  export interface CurrentWeatherInterface {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: number;
    time: string;
  }
  
  export interface OpenmeteoInterface {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_weather: CurrentWeatherInterface;
    hourly_units: HourlyUnitsInterface;
    hourly: HourlyInterface;
    daily_units: DailyUnitsInterface;
    daily: DailyInterface;
  }