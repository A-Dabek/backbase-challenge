import {ComponentFixture, TestBed} from "@angular/core/testing";
import {WeatherModule} from "./weather.module";
import {AppModule} from "../app.module";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CityWeatherComponent} from "./city-weather.component";
import {RawCurrentWeather, RawWeatherForecast} from "./weather-data";
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
    fixture.componentInstance.city = 'Test';
    fixture.detectChanges();
  });

  function verifyWeatherInfo(index: number, timestamp: number, temp: number, wind: number) {
    const times = fixture.debugElement.queryAll(By.css('.label__time'))
      .map(de => de.nativeElement as HTMLSpanElement);
    const temps = fixture.debugElement.queryAll(By.css('.weather__temp'))
      .map(de => de.nativeElement as HTMLSpanElement);
    const winds = fixture.debugElement.queryAll(By.css('.weather__wind'))
      .map(de => de.nativeElement as HTMLSpanElement);

    const date = new Date();
    date.setTime(timestamp);
    const timeText = date.toLocaleTimeString();
    expect(times[index].textContent).toContain(timeText);
    expect(temps[index].textContent).toEqual(`${temp}°C`);
    expect(winds[index].textContent).toEqual(`${wind} m/s`);
  }

  it('should fetch and show current weather', async () => {
    const timestamp = new Date().getTime();
    const response: RawCurrentWeather = {
      dt: timestamp / 1000,
      wind: {speed: 1},
      main: {temp: 2},
      coord: {lat: 3, lon: 4}
    };

    controller.expectOne({method: 'get'}).flush(response);
    fixture.detectChanges();

    verifyWeatherInfo(0, timestamp, 2, 1);
    controller.verify();
  });

  it('should show NaN values in case of fetching error', () => {
    controller.expectOne({method: 'get'}).error(new ErrorEvent(''));
    fixture.detectChanges();

    verifyWeatherInfo(0, NaN, NaN, NaN);
    controller.verify();
  });

  it('should fetch and show next 5 hours of weather forecast on click', () => {
    const timestamp = new Date().getTime();

    const response: RawCurrentWeather = {
      dt: timestamp / 1000,
      wind: {speed: 0.1},
      main: {temp: 0.2},
      coord: {lat: 3, lon: 4}
    };
    const forecastResponse: RawWeatherForecast = {
      hourly: new Array(7).fill(1).map((_, index) => ({
        dt: (timestamp / 1000) + index,
        wind_speed: 100 + index,
        temp: 1000 + index,
      }))
    };

    controller.expectOne({method: 'get'}).flush(response);
    fixture.detectChanges();

    const container = fixture.debugElement.query(By.css('.container')).nativeElement as HTMLDivElement;
    container.click();
    controller.expectOne({method: 'get'}).flush(forecastResponse);
    fixture.detectChanges();

    const weatherInfos = fixture.debugElement.queryAll(By.css('.weather__info'));
    expect(weatherInfos.length).toEqual(6);

    verifyWeatherInfo(0, timestamp, 0.2, 0.1);
    // skips first, and picks next 5
    verifyWeatherInfo(1, timestamp+1000, 1001, 101);
    verifyWeatherInfo(2, timestamp+2000, 1002, 102);
    verifyWeatherInfo(3, timestamp+3000, 1003, 103);
    verifyWeatherInfo(4, timestamp+4000, 1004, 104);
    verifyWeatherInfo(5, timestamp+5000, 1005, 105);
    controller.verify();
  });

  it('should not show forecast on click if there was a fetching error', () => {
    const timestamp = new Date().getTime();

    const response: RawCurrentWeather = {
      dt: timestamp / 1000,
      wind: {speed: 0.1},
      main: {temp: 0.2},
      coord: {lat: 3, lon: 4}
    };

    controller.expectOne({method: 'get'}).flush(response);
    fixture.detectChanges();

    const container = fixture.debugElement.query(By.css('.container')).nativeElement as HTMLDivElement;
    container.click();
    controller.expectOne({method: 'get'}).error(new ErrorEvent(''));
    fixture.detectChanges();

    const weatherInfos = fixture.debugElement.queryAll(By.css('.weather__info'));
    expect(weatherInfos.length).toEqual(1);

    verifyWeatherInfo(0, timestamp, 0.2, 0.1);
    controller.verify();
  });

});
