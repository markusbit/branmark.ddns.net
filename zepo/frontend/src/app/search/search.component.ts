import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Card } from 'src/shared/models/Card';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  cards: Card[] = [];
  constructor(
    private cardService: CardService,
    activatedRoute: ActivatedRoute
  ) {
    let cardsObservable: Observable<Card[]>;
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        cardsObservable = this.cardService.getAllCardsBySearchTerm(
          params['searchTerm']
        );
      } else {
        cardsObservable = this.cardService.getAll();
      }
      cardsObservable.subscribe((serverCards) => {
        this.cards = serverCards;
      });
    });
  }

  ngOnInit(): void {}
}
