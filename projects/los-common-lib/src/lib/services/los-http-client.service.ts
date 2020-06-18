import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LosHttpClientService {
  constructor(private http: HttpClient) { }

  get = <T>(endpoint: string, options?: { params?: any; responseType?: any }) => this.http.get<T>(endpoint, options);
  put = <T, S = any>(endpoint: string, data?: S) => this.http.put<T>(endpoint, data);
}
