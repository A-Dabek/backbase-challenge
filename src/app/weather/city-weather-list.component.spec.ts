import {ComponentFixture, TestBed} from "@angular/core/testing";
import {WeatherModule} from "./weather.module";
import {AppModule} from "../app.module";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {By} from "@angular/platform-browser";
import {BrowserTestingModule} from "@angular/platform-browser/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {CityWeatherListComponent} from "./city-weather-list.component";

describe('City Weather Component', () => {
  let fixture: ComponentFixture<CityWeatherListComponent>;
  let controller: HttpTestingController;
  let cities = ['Test', 'Test 2', 'Test 3'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        BrowserTestingModule,
        NoopAnimationsModule,
        WeatherModule,
        HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(CityWeatherListComponent);
    controller = TestBed.inject(HttpTestingController);
    fixture.componentInstance.cities = cities;
    fixture.detectChanges();
  });

  it('should display an item for every city', () => {
    const items = fixture.debugElement.queryAll(By.css('li'));
    expect(items.length).toEqual(3);
    expect(controller.match({method: 'get'}).length).toEqual(cities.length)
  });
});
