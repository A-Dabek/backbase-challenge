import {ChangeDetectionStrategy, Component} from '@angular/core';
import {WeatherData} from "./weather/weather-data";

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.css'],
  template: `
    <main>
      <chl-city-weather-list [cities]="cities">
      </chl-city-weather-list>
    </main>
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
