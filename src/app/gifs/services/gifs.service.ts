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
    query = query.trim().toLowerCase()
    if (!this._historyLog.includes(query)) {
      this._historyLog.unshift(query);
    }
    this._historyLog = this._historyLog.splice(0, 10);
  }

  constructor() { }
}
