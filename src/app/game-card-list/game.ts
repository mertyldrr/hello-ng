export interface GameApiResponse {
  previous?: string;
  next?: string;
  results: Game[];
  count: number;
}

export interface Game {
  id: string;
  background_image: string;
  name: string;
  released: string;
  metacritic: number;
}
