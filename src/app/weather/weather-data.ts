export interface RawCurrentWeather {
  dt: number;
  wind: { speed: number };
  main: { temp: number };
  coord: { lat: number, lon: number };
}

export interface RawWeatherForecast {
  hourly: {
    dt: number;
    temp: number;
    wind_speed: number;
  }[];
}

export interface WeatherData {
  timestamp: number;
  averageTemperature: number;
  windStrength: number;
}
