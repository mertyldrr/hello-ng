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
  filteredGames$!: Observable<Game[]>;
  allKeys: string[] = [];
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.allKeys = Object.keys({ ...localStorage });
    this.filterGames();
    console.log(this.allKeys);
  }

  filterGames(pageNumber: number = 1): void {
    this.filteredGames$ = this.gameService.getGames(pageNumber).pipe(
      map((games: Game[]) => {
        console.log(games);
        return games.filter((game) =>
          this.allKeys.includes(game.id.toString())
        );
      })
    );
  }
}
