import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../services/game.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() pageRange!: number;
  @Input() activePage!: number;
  @Input() getGames!: (page: number) => void;
  @Input() displayAdditionalPages!: () => void;
  @Input() displayPreviousPages!: () => void;
  lastPage$!: Observable<number | undefined>;
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.lastPage$ = this.gameService.getLastPage();
    console.log(this.activePage);
  }
  isPageAvailable(page: number): boolean {
    let isAvailable = false;
    this.lastPage$.subscribe((lastPage: number | undefined) => {
      if (lastPage !== undefined && page <= lastPage && page >= 1) {
        isAvailable = true;
      }
    });
    return isAvailable;
  }
}
