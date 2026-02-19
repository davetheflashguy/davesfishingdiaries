import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CatchFilter {
  species?: string;
  year?: number;
  water_body?: string;
  conditions?: string;
}

@Injectable({ providedIn: 'root' })
export class CatchListsService {
  private baseUrl = 'http://localhost:8000/catches';

  constructor(private http: HttpClient) {}

  getCatches(filters: CatchFilter = {}, limit: number = 20, offset: number = 0): Observable<any[]> {
    let params = new HttpParams();
    
    if (filters.species) params = params.set('species', filters.species);
    if (filters.year) params = params.set('year', filters.year.toString());
    if (filters.water_body) params = params.set('water_body', filters.water_body);
    if (filters.conditions) params = params.set('conditions', filters.conditions);
    
    // Add pagination params
    params = params.set('limit', limit.toString());
    params = params.set('offset', offset.toString());

    return this.http.get<any[]>(this.baseUrl, { params });
  }

  getSpeciesList(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/species`);
  }

  getWaterBodies(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/water-bodies`);
  }

  getYears(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/years`);
  }
}
