import {NgModule} from "@angular/core";
import {WeatherComponent} from "./weather.component";

@NgModule({
  exports: [
    WeatherComponent
  ],
  declarations: [WeatherComponent]
})
export class WeatherModule {

}
