import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, lastValueFrom, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Game, GameApiResponse } from '../game-card-list/game';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class GameService {
  apiKey = environment.apiKey;
  pageNumber = 1;
  pageSize = 15;
  apiUrl = `https://api.rawg.io/api/games?key=${this.apiKey}&page_size=${this.pageSize}`;
  apiUrlGameDetails = `https://api.rawg.io/api/games`;
  count: BehaviorSubject<number | undefined> = new BehaviorSubject<
    number | undefined
  >(undefined);
  nextPageUrl: string | undefined;
  prevPageUrl: string | undefined;
  constructor(private http: HttpClient) {}

  getGames(pageNumber: number = 1, searchQuery?: string): Observable<Game[]> {
    let url = `${this.apiUrl}&page=${pageNumber}`;
    if (searchQuery) {
      url = `${url}&search=${searchQuery}`;
    }
    console.log('API get games request ==>', url);
    return this.http.get<GameApiResponse>(url, httpOptions).pipe(
      map((response) => {
        this.count.next(response.count);
        this.nextPageUrl = response.next;
        this.prevPageUrl = response.previous;
        return response.results.map((game) => ({
          id: game.id,
          background_image: game.background_image,
          name: game.name,
          released: game.released,
          metacritic: game.metacritic,
        }));
      }),
      catchError((error) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }

  async getGameDetails(gameId: string): Promise<Game> {
    let url = `${this.apiUrlGameDetails}/${gameId}?key=${this.apiKey}`;
    const gameDetails: any = await lastValueFrom(
      this.http.get(url, httpOptions)
    );
    const game: Game = {
      id: gameDetails.id,
      background_image: gameDetails.background_image,
      name: gameDetails.name,
      released: gameDetails.released,
      metacritic: gameDetails.metacritic,
    };

    return game;
  }

  async fetchGamesByIds(gameIds: string[]): Promise<any[]> {
    const gameDetailsPromises: Promise<Game>[] = [];

    for (const gameId of gameIds) {
      gameDetailsPromises.push(this.getGameDetails(gameId));
    }

    try {
      const gameDetails: any[] = await Promise.all(gameDetailsPromises);
      return gameDetails;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  getCount(): Observable<number | undefined> {
    return this.count.asObservable();
  }

  getLastPage(): Observable<number | undefined> {
    return this.getCount().pipe(
      map((count) => {
        if (count) {
          return Math.ceil(count / this.pageSize);
        }
        return undefined;
      })
    );
  }
}
