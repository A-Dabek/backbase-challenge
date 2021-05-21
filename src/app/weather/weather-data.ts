export interface RawCurrentWeather {
  dt: number;
  wind: {speed: number};
  main: {temp: number};
}

export interface WeatherData {
  timestamp: number;
  averageTemperature: number;
  windStrength: number;
}

export interface RawWeatherForecast {

}
