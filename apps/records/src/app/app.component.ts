import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'angular-dotnet-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(readonly router: Router) {}
}
