import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {RawCurrentWeather, RawWeatherForecast, WeatherData} from "./weather-data";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, tap} from "rxjs/operators";


@Injectable({providedIn: "root"})
export class WeatherService {
  private apiKey: string = '894025b7d489fd3d19ef44bd5bd10eaf';
  private coordinationCache: { [k: string]: { lon: number, lat: number } } = {};

  constructor(private http: HttpClient) {
  }

  private getParams(): HttpParams {
    return new HttpParams()
      .append('appid', this.apiKey)
      .append('units', 'metric');
  }

  fetchWeatherDataForCity(city: string): Observable<WeatherData> {
    const params = this.getParams().append('q', city);
    return this.http.get<RawCurrentWeather>('https://api.openweathermap.org/data/2.5/weather', {
      params
    }).pipe(
      tap(e => this.coordinationCache[city] = e.coord),
      map(e => ({
        timestamp: e.dt,
        averageTemperature: e.main.temp,
        windStrength: e.wind.speed
      }))
    );
  }

  fetchForecastForCity(city: string): Observable<WeatherData[]> {
    const params = this.getParams()
      .append('exclude', 'current,minutely,daily,alerts')
      .append('lat', this.coordinationCache[city].lat)
      .append('lon', this.coordinationCache[city].lon);
    return this.http.get<RawWeatherForecast>('https://api.openweathermap.org/data/2.5/onecall', {
      params
    }).pipe(
      map(response => response.hourly
        .filter((_, index) => index > 0 && index < 6)
        .map(item => ({
          timestamp: item.dt,
          averageTemperature: item.temp,
          windStrength: item.wind_speed
        }))),
    );
  }
}
