import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {WeatherService} from "./weather.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {WeatherData} from "./weather-data";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'chl-city-weather',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./city-weather.component.css'],
  template: `
    <div (click)="toggleForecast()">
      <h1>{{city}}</h1>
      <ng-container *ngIf="weatherDataList$ | async as list">
        <chl-weather class="weather__info" *ngFor="let item of list" [weatherData]="item"></chl-weather>
      </ng-container>
    </div>
  `
})
export class CityWeatherComponent implements OnInit {
  @Input() city: string = '';
  currentWeatherVisible$ = new BehaviorSubject(true);
  weatherDataList$: Observable<WeatherData[]> = of([]);

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.weatherDataList$ = this.currentWeatherVisible$.pipe(
      switchMap(current => current
        ? this.weatherService.fetchWeatherDataForCity(this.city).pipe(map(x => [x]))
        : this.weatherService.fetchForecastForCity(this.city))
    );
  }

  toggleForecast() {
    this.currentWeatherVisible$.next(!this.currentWeatherVisible$.value);
  }
}
