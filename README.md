# BackbaseChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.1.

I approached the challenge by creating a separate 
[Angular module](./src/app/weather/weather.module.ts) 
for this feature to separate concerns.

I decided to create reusable component [WeatherComponent](./src/app/weather/weather.component.ts)
that displays both current weather conditions and forecast.

On top of that dummy component I build a smart component
[CityWeatherComponent](./src/app/weather/city-weather.component.ts)
that adds context to weather information and provides data
by using a dedicated service [WeatherService](./src/app/weather/weather.service.ts).

To display a list of cities I added yet another component
[CityWeatherListComponent](./src/app/weather/city-weather-list.component.ts)
which serves as an aggregate component and serve no other purposes. 
It's used directly by [AppComponent](./src/app/app.component.ts) and it's the only
component exported by [WeatherModule](./src/app/weather/weather.module.ts) .

I've extracted some code to [common](./src/app/common) directory
as it is not directly tied to weather feature and might be useful
in the future.

I have also decided not to use any external dependencies
as I believe they were not necessary and would only bloat the app.

I have used OnPush detection strategy in all components due to
my personal disagreement about the concept of Angular's default strategy :)

I used inline templates as personal preference. It helps me
develop faster and forces me to make my component classes smaller.
