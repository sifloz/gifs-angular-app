import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  private _apiKey: string = 'uUgsCuGTgebJzShvOYU2UqG8buP3aHiE';
  private _historyLog: string[] = [];

  public results: Gif[] = [];

  get historial() {
    return [...this._historyLog];
  }

  constructor(private http: HttpClient) {
    this._historyLog = JSON.parse(localStorage.getItem('history_log')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searchGifsHandler(query: string) {
    query = query.trim().toLowerCase()
    if (!this._historyLog.includes(query)) {
      this._historyLog.unshift(query);
      this._historyLog = this._historyLog.splice(0, 10);

      localStorage.setItem('history_log', JSON.stringify(this._historyLog));
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this._apiKey}&q=${query}&limit=10`)
      .subscribe((res) => {
        console.log(res.data)
        this.results = res.data;
        localStorage.setItem('results', JSON.stringify(res.data))
    });
  }
}
