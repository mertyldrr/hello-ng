import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../services/game.service';
import { GameCardComponent } from '../game-card/game-card.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { Game } from './game';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-card-list',
  standalone: true,
  imports: [CommonModule, GameCardComponent, PaginationComponent],
  templateUrl: './game-card-list.component.html',
  styleUrls: ['./game-card-list.component.css'],
})
export class GameCardListComponent implements OnInit {
  games$!: Observable<Game[]>;
  pageRange = 1;
  activePage = 1;
  showAdditionalPages = false;
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.games$ = this.gameService.getGames();
  }

  getGames(pageNumber: number): void {
    this.pageRange = pageNumber; // Update the currentPage value
    this.activePage = pageNumber;
    this.games$ = this.gameService.getGames(pageNumber);
  }

  displayAdditionalPages() {
    this.pageRange += 4;
  }

  displayPreviousPages() {
    this.pageRange -= 4;
  }
}
