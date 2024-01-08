export interface DailyInterface {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
    windspeed_10m_max: number[];
    winddirection_10m_dominant: number[];
    weathercode: number[];
  }
  
  interface DailyUnitsInterface {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    apparent_temperature_max: string;
    apparent_temperature_min: string;
    sunrise: string;
    sunset: string;
    uv_index_max: string;
    windspeed_10m_max: string;
    winddirection_10m_dominant: string;
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

  export interface CurrentInterface {
    time: string;
    interval: number;
    temperature_2m: number;
    apparent_temperature: number;
    is_day: number;
    weathercode: number;
    relativehumidity_2m: number;
    windspeed_10m: number;
    winddirection_10m: number;
  }

  interface CurrentUnitsInterface {
    time: string;
    interval: string;
    temperature_2m: string;
    is_day: string;
    weathercode: string;
    relativehumidity_2m: string;
    windspeed_10m: string;
    winddirection_10m: string;
  }

  export interface OpenMeteoData {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: CurrentUnitsInterface;
    current?: CurrentInterface;
    hourly_units?: HourlyUnitsInterface;
    hourly?: HourlyInterface;
    daily_units?: DailyUnitsInterface;
    daily?: DailyInterface;
  }