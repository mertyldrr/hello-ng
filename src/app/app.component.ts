import { Component } from '@angular/core';
import {
  NgSwitch,
  NgSwitchDefault,
  NgSwitchCase,
  CommonModule,
} from '@angular/common';
import { GameCardListComponent } from './game-card-list/game-card-list.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NgSwitch,
    NgSwitchDefault,
    NgSwitchCase,
    GameCardListComponent,
    NavbarComponent,
  ],
})
export class AppComponent {
  title = 'hello-ng';

  videoEnded = false;

  onVideoEnded(): void {
    this.videoEnded = true;
  }
}
