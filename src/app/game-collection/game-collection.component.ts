import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, filter, map } from 'rxjs';
import { Game } from '../game-card-list/game';
import { GameService } from '../services/game.service';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
  selector: 'app-game-collection',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './game-collection.component.html',
  styleUrls: ['./game-collection.component.css'],
})
export class GameCollectionComponent implements OnInit {
  collection: Game[] = [];
  allKeys: string[] = [];
  constructor(private gameService: GameService) {}

  async ngOnInit(): Promise<void> {
    this.allKeys = Object.keys({ ...localStorage }).filter(
      // to discard default 3 keys that starts with j
      (gameId) => !gameId.startsWith('j')
    );
    this.collection = await this.gameService.fetchGamesByIds(this.allKeys);
  }
}
