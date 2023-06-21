import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../game-card-list/game';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent {
  @Input() game: Game = {} as Game;
}
