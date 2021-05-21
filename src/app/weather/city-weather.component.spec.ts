import {ComponentFixture, TestBed} from "@angular/core/testing";
import {WeatherModule} from "./weather.module";
import {AppModule} from "../app.module";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CityWeatherComponent} from "./city-weather.component";
import {RawCurrentWeather} from "./weather-data";
import {By} from "@angular/platform-browser";
import {BrowserTestingModule} from "@angular/platform-browser/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('City Weather Component', () => {
  let fixture: ComponentFixture<CityWeatherComponent>;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        BrowserTestingModule,
        NoopAnimationsModule,
        WeatherModule,
        HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(CityWeatherComponent);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should fetch and show current weather', async () => {
    fixture.componentInstance.city = 'Test';
    fixture.detectChanges();

    const date = new Date();
    const timestamp = date.getTime();
    const timeText = date.toLocaleTimeString();
    const response: RawCurrentWeather = {
      dt: timestamp / 1000,
      wind: {speed: 1},
      main: {temp: 2},
      coord: {lat: 3, lon: 4}
    };

    controller.expectOne({method: 'get'}).flush(response);
    fixture.detectChanges();
    await fixture.whenRenderingDone();
    await fixture.whenStable();
    fixture.detectChanges();

    const time = fixture.debugElement.query(By.css('.label__time')).nativeElement as HTMLLabelElement;
    const temp = fixture.debugElement.query(By.css('.weather__temp')).nativeElement as HTMLSpanElement;
    const wind = fixture.debugElement.query(By.css('.weather__wind')).nativeElement as HTMLSpanElement;

    expect(time.textContent).toContain(timeText);
    expect(temp.textContent).toEqual('2°C');
    expect(wind.textContent).toEqual('1 m/s');

    controller.verify();
  });

  it('should show NaN values in case of fetching error', () => {
  });

  it('should fetch and show weather forecast on click', () => {

  });

});
