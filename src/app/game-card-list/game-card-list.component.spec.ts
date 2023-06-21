import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardListComponent } from './game-card-list.component';

describe('GameCardListComponent', () => {
  let component: GameCardListComponent;
  let fixture: ComponentFixture<GameCardListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GameCardListComponent]
    });
    fixture = TestBed.createComponent(GameCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
