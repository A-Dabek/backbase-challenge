import {Component} from '@angular/core';
import {WeatherData} from "./weather/weather-data";

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
    <chl-weather [weatherData]="weatherData"></chl-weather>
  `
})
export class AppComponent {
  title = 'backbase-challenge';

  weatherData: WeatherData = {
    windStrength: 'asd',
    averageTemperature: 15
  };
}
