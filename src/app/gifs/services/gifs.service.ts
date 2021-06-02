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

  constructor(private http: HttpClient) {}

  searchGifsHandler(query: string) {
    query = query.trim().toLowerCase()
    if (!this._historyLog.includes(query)) {
      this._historyLog.unshift(query);
      this._historyLog = this._historyLog.splice(0, 10);
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this._apiKey}&q=${query}&limit=10`)
      .subscribe((res) => {
        console.log(res.data)
        this.results = res.data;
    });
  }
}
