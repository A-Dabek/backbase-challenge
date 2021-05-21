import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {WeatherData} from "./weather-data";

@Component({
  selector: 'chl-weather',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>{{weatherData.averageTemperature}}</div>
    <div>{{weatherData.windStrength}}</div>
  `
})
export class WeatherComponent {
  @Input() weatherData!: WeatherData;
}
