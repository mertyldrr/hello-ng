import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../game-card-list/game';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent {
  @Input() game: Game = {} as Game;

  updateCollection(gameId: string) {
    let game = localStorage.getItem(gameId);
    if (game) {
      localStorage.removeItem(gameId);
    } else {
      localStorage.setItem(gameId, 'true');
    }
  }

  isInCollection(gameId: string): boolean {
    return localStorage.getItem(gameId) ? true : false;
  }

  logger(content: string) {
    console.log(content);
  }
}
