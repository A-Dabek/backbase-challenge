import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {WeatherData} from "./weather-data";

@Component({
  selector: 'chl-weather',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label>Time: <span>{{weatherData.timestamp | timestamp}}</span></label>
    <label>Temperature: <span>{{weatherData.averageTemperature}}°C</span></label>
    <label>Wind: <span>{{weatherData.windStrength}} m/s</span></label>
  `
})
export class WeatherComponent {
  @Input() weatherData!: WeatherData;
}
