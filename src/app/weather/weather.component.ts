import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {WeatherData} from "./weather-data";

@Component({
  selector: 'chl-weather',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./weather.component.css'],
  template: `
    <label class="label__time">
      {{weatherData.timestamp | timestamp}}
    </label>
    <div class="flex">
      <label>Temperature:</label>
      <span>{{weatherData.averageTemperature}}°C</span>
    </div>
    <div class="flex">
      <label>Wind:</label>
      <span>{{weatherData.windStrength}} m/s</span>
    </div>
  `
})
export class WeatherComponent {
  @Input() weatherData!: WeatherData;
}
