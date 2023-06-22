import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../services/game.service';
import { GameCardComponent } from '../game-card/game-card.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { Game } from './game';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-game-card-list',
  standalone: true,
  imports: [
    CommonModule,
    GameCardComponent,
    PaginationComponent,
    FormsModule,
    SearchBarComponent,
  ],
  templateUrl: './game-card-list.component.html',
  styleUrls: ['./game-card-list.component.css'],
})
export class GameCardListComponent implements OnInit {
  games$!: Observable<Game[]>;
  pageRange = 1;
  activePage = 1;
  showAdditionalPages = false;
  searchQuery: string = '';
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.games$ = this.gameService.getGames();
  }

  getGames(pageNumber: number = 1): void {
    if (this.searchQuery && this.searchQuery !== '') {
      this.games$ = this.gameService.getGames(pageNumber, this.searchQuery);
    } else {
      this.games$ = this.gameService.getGames(pageNumber);
    }
    this.pageRange = pageNumber; // Update the currentPage value
    this.activePage = pageNumber;
  }

  displayAdditionalPages() {
    this.pageRange += 4;
  }

  displayPreviousPages() {
    this.pageRange -= 4;
  }

  updateSearchQuery(event: any) {
    console.log(event.target.value, 'updateSearchQuery');
    this.searchQuery = event.target.value;
  }
}
