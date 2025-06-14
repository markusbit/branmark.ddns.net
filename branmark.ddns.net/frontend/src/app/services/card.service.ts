import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CARDS_BY_SEARCH_URL, CARDS_URL } from 'src/shared/constants/urls';
import { Card } from 'src/shared/models/Card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Card[]> {
    return this.http.get<Card[]>(CARDS_URL);
  }

  getAllCardsBySearchTerm(searchTerm: string) {
    return this.http.get<Card[]>(CARDS_BY_SEARCH_URL + searchTerm);
  }
}
