import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherSummary } from './types';
import { WeatherService } from './weather.service';

@Component({
  selector: 'angular-dotnet-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  weatherSummaries: WeatherSummary[] | undefined;
  private weatherSub: Subscription | undefined;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.weatherSub = this.weatherService.weather.subscribe(updatedWeatherSummaries => this.weatherSummaries = updatedWeatherSummaries)
  }

  ngOnDestory() {
    this.weatherSub?.unsubscribe()
  }
}
