import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { WeatherSummary } from './types';

@Injectable()
export class WeatherService {
  public weather: Observable<WeatherSummary[]>;
  constructor(private http: HttpClient) {
    this.weather = http.get<WeatherSummary[]>(`${environment.api}/weather`)
  }
}
