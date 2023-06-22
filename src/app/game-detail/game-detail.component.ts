import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../services/game.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css'],
})
export class GameDetailComponent implements OnInit {
  game: any;
  gameId: string | null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService
  ) {
    this.gameId = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit(): Promise<void> {
    if (this.gameId) {
      this.game = await this.gameService.getGameDetails(this.gameId);
    }
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
