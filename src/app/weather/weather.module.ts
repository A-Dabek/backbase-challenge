import {NgModule} from "@angular/core";
import {WeatherComponent} from "./weather.component";
import {CityWeatherListComponent} from "./city-weather-list.component";
import {CommonModule} from "@angular/common";
import {CityWeatherComponent} from "./city-weather.component";
import {OwnCommonModule} from "../common/own-common.module";

@NgModule({
  declarations: [
    WeatherComponent,
    CityWeatherComponent,
    CityWeatherListComponent,
  ],
  imports: [CommonModule, OwnCommonModule],
  exports: [
    CityWeatherListComponent
  ],
})
export class WeatherModule {

}
