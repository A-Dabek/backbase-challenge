import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {WeatherService} from "./weather.service";
import {Observable, of} from "rxjs";
import {WeatherData} from "./weather-data";
import {map} from "rxjs/operators";

@Component({
  selector: 'chl-city-weather',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="weatherDataList$ | async as list" (click)="toggleForecast()">
      <h1>{{city}}</h1>
      <chl-weather *ngFor="let item of list" [weatherData]="item"></chl-weather>
    </div>
  `
})
export class CityWeatherComponent implements OnInit {
  @Input() city: string = '';
  currentWeatherVisible: boolean = true;
  weatherDataList$: Observable<WeatherData[]> = of([]);

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.weatherDataList$ = this.currentWeatherVisible
      ? this.weatherService.fetchWeatherDataForCity(this.city).pipe(map(x => [x]))
      : this.weatherService.fetchForecastForCity(this.city);
  }

  toggleForecast() {
    this.currentWeatherVisible = !this.currentWeatherVisible;
    this.fetchData();
  }
}
