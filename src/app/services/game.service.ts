import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
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

  getCurrentPage(): number {
    return this.pageNumber;
  }

  getCount(): Observable<number | undefined> {
    return this.count.asObservable();
  }

  getNextPage(): void {
    if (this.nextPageUrl) {
      this.getGames(this.pageNumber + 1);
    }
  }

  getPrevPage(): void {
    if (this.prevPageUrl) {
      this.getGames(this.pageNumber - 1);
      this.pageNumber -= 1;
    }
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
