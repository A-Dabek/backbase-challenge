import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {RawCurrentWeather, WeatherData} from "./weather-data";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";



@Injectable({providedIn: "root"})
export class WeatherService {
  private apiKey: string = '894025b7d489fd3d19ef44bd5bd10eaf'

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
      map(e => ({
        timestamp: e.dt,
        averageTemperature: e.main.temp,
        windStrength: e.wind.speed
      }))
    );
  }

  fetchForecastForCity(city: string): Observable<WeatherData[]> {
    return of([

    ]);
  }
}
