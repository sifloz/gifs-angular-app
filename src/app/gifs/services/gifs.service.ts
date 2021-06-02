import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  private _apiKey: string = 'uUgsCuGTgebJzShvOYU2UqG8buP3aHiE';
  private _serviceUrl: string = 'https://api.giphy.com/v1/gifs';
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

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${ this._serviceUrl }/search`, { params })
      .subscribe((res) => {
        console.log(res.data)
        this.results = res.data;
        localStorage.setItem('results', JSON.stringify(res.data))
    });
  }
}
