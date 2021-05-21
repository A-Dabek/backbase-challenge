import {ChangeDetectionStrategy, Component, Input, OnInit, TrackByFunction} from "@angular/core";
import {WeatherService} from "./weather.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {WeatherData} from "./weather-data";
import {switchMap} from "rxjs/operators";
import {listFoldingAnimation} from "../common/list-folding.animation";

@Component({
  selector: 'chl-city-weather',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./city-weather.component.css'],
  template: `
    <div (click)="toggleForecast()">
      <h1>{{city}}</h1>
      <small>Click for forecast!</small>
      <chl-weather *ngIf="currentWeatherData$ | async as data" class="weather__info" [weatherData]="data">
      </chl-weather>
      <ng-container *ngIf="forecastData$ | async as list">
        <div [@listFolding]="list.length">
          <chl-weather class="weather__info" *ngFor="let item of list; trackBy: trackByFn"
                       [weatherData]="item"></chl-weather>
        </div>
      </ng-container>
    </div>
  `,
  animations: [listFoldingAnimation]
})
export class CityWeatherComponent implements OnInit {
  @Input() city: string = '';
  currentWeatherVisible$ = new BehaviorSubject(true);
  currentWeatherData$: Observable<WeatherData> | undefined;
  forecastData$: Observable<WeatherData[]> = of([]);
  trackByFn: TrackByFunction<WeatherData> = (index, item) => item.timestamp;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.currentWeatherData$ = this.weatherService.fetchWeatherDataForCity(this.city);
    this.forecastData$ = this.currentWeatherVisible$.pipe(
      switchMap(current => current
        ? of([])
        : this.weatherService.fetchForecastForCity(this.city))
    );
  }

  toggleForecast() {
    this.currentWeatherVisible$.next(!this.currentWeatherVisible$.value);
  }
}
