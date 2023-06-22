import { Route } from '@angular/router';
import { GameDetailComponent } from './app/game-detail/game-detail.component';
import { GameCardListComponent } from './app/game-card-list/game-card-list.component';
import { GameCollectionComponent } from './app/game-collection/game-collection.component';

export const routes: Route[] = [
  {
    path: 'games',
    component: GameCardListComponent,
  },
  {
    path: 'games/:id',
    component: GameDetailComponent,
  },
  {
    path: 'collection',
    component: GameCollectionComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'games',
  },
];
