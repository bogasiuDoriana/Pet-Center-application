import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetAdoption } from '../../domain/adoption';

@Injectable({ providedIn: 'root' })
export class AdoptionService {

  private baseUrl = 'http://localhost:8080/pet_adoption';

  constructor(private http: HttpClient) {}

  getPending(): Observable<PetAdoption[]> {
    return this.http.get<PetAdoption[]>(`${this.baseUrl}/pending`);
  }

  apply(idowner: number, idanimal: number): Observable<PetAdoption> {
    return this.http.post<PetAdoption>(`${this.baseUrl}/apply?idowner=${idowner}&idanimal=${idanimal}`, {});
  }

  approve(id: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/approve/${id}`, {});
  }

  reject(id: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/reject/${id}`, {});
  }
}
