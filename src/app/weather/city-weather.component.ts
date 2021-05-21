import {ChangeDetectionStrategy, Component, Input, OnInit, TrackByFunction} from "@angular/core";
import {WeatherService} from "./weather.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {WeatherData} from "./weather-data";
import {map, switchMap} from "rxjs/operators";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ height: 0, overflow: 'hidden', opacity: 0 }),
        stagger('60ms', animate('600ms ease-out', style({ height: '*', overflow: 'none', opacity: 1 })))],
      { optional: true }
    ),
    query(':leave',
      animate('500ms', style({ height: 0, overflow: 'hidden', opacity: 0 })),
      { optional: true }
    )
  ])
]);

@Component({
  selector: 'chl-city-weather',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./city-weather.component.css'],
  template: `
    <div (click)="toggleForecast()">
      <h1>{{city}}</h1>
      <div *ngIf="weatherDataList$ | async as list" >
        <div [@listAnimation]="list.length">
          <chl-weather class="weather__info" *ngFor="let item of list; trackBy: trackByFn" [weatherData]="item"></chl-weather>
        </div>
      </div>
    </div>
  `,
  animations: [listAnimation]
})
export class CityWeatherComponent implements OnInit {
  @Input() city: string = '';
  currentWeatherVisible$ = new BehaviorSubject(true);
  weatherDataList$: Observable<WeatherData[]> = of([]);
  trackByFn: TrackByFunction<WeatherData> = (index, item) => item.timestamp;

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
