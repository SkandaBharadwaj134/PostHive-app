import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  apiBaseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  get(url: string, query?: any): Observable<any> {
    const _query: any = query || {};
    return this.http.get(`${this.apiBaseUrl}/${url}`, {params: _query});
  }

  post(url: string, data: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/${url}`, data);
  }

  put(url: string, data: any): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/${url}`, data);
  }

  delete(url: string): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/${url}`);
  }


}
