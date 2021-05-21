import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {WeatherData} from "./weather-data";

@Injectable({providedIn: "root"})
export class WeatherService {

  fetchWeatherDataForCity(): Observable<WeatherData> {
    return of({
      averageTemperature: 144,
      windStrength: 'asdf'
    });
  }

  fetchForecastForCity(): Observable<WeatherData[]> {
    return of([

    ]);
  }
}
