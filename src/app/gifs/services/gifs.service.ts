import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  private _historyLog: string[] = [];

  get historial() {
    return [...this._historyLog];
  }

  searchGifsHandler(query: string) {
    this._historyLog.unshift(query);
  }

  constructor() { }
}
