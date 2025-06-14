import { Component, OnInit } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';
import { CardService } from '../services/card.service';
import { Card } from 'src/shared/models/Card';
import { Observable } from 'rxjs';

declare var toggleRubberBand: any;
declare var initRubberBand: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cards: Card[] = [];
  constructor(
    private cardService: CardService
  ) {
    let cardsObservable: Observable<Card[]>;
    cardsObservable = this.cardService.getAll();
    cardsObservable.subscribe((serverCards) => {
      this.cards = serverCards;
    });
  }

  ngOnInit(): void {
    new initRubberBand();
    new toggleRubberBand();
  }
}
