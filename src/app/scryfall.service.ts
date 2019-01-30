import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScryfallService {

  constructor(private http: HttpClient) { }

  public getSets() {
    return this.http.get(`https://api.scryfall.com/sets`, {headers: new HttpHeaders(), observe: 'response'});
  }
}
