import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CatchesService {
  constructor(private http: HttpClient) {}

  getCatches(filters: any = {}): Observable<any[]> {
    let params = new HttpParams();
    if (filters?.species) params = params.set('species', filters.species);
    if (filters?.location) params = params.set('location', filters.location);
    if (filters?.dateFrom) params = params.set('date_from', filters.dateFrom);
    if (filters?.dateTo) params = params.set('date_to', filters.dateTo);

    // Calls /catches (proxied by nginx to backend service)
    return this.http.get<any[]>('/catches', { params });
  }
}
