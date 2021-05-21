import {ChangeDetectionStrategy, Component, Input} from "@angular/core";

@Component({
  selector: 'chl-city-weather-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul>
      <li *ngFor="let city of cities">
        <chl-city-weather [city]="city">
        </chl-city-weather>
      </li>
    </ul>
  `
})
export class CityWeatherListComponent {
  @Input() cities: string[] = [];
}
