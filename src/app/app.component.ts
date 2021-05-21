import {ChangeDetectionStrategy, Component} from '@angular/core';
import {WeatherData} from "./weather/weather-data";

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <chl-city-weather-list [cities]="cities">
    </chl-city-weather-list>
  `
})
export class AppComponent {
  cities = [
    'Warsaw',
    'London',
    'Paris',
    'Athens',
    'Berlin'
  ];
}
