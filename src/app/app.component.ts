import { Component } from '@angular/core';
import {
  NgSwitch,
  NgSwitchDefault,
  NgSwitchCase,
  CommonModule,
} from '@angular/common';
import { GameCardListComponent } from './game-card-list/game-card-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { radixStar, radixStarFilled } from '@ng-icons/radix-icons';
import { provideIcons } from '@ng-icons/core';
import { RouterOutlet } from '@angular/router';

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
    RouterOutlet,
  ],
  viewProviders: [provideIcons({ radixStar, radixStarFilled })],
})
export class AppComponent {
  title = 'hello-ng';

  videoEnded = false;

  onVideoEnded(): void {
    this.videoEnded = true;
  }
}
