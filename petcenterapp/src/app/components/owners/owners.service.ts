import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Owners } from '../../domain/owners';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
}) 

export class OwnersService {

  private apiServerUrl = environment.apiBaseUrl
  constructor(private http: HttpClient) { }

  public getOwners(): Observable<Owners[]>{
    return this.http.get<Owners[]>(`${this.apiServerUrl}/owners/all`);
  }
    public addOwners(owners: Owners): Observable<Owners>{
    return this.http.post<Owners>(`${this.apiServerUrl}/owners/add`, owners);
  }
    public updateOwners(owners: Owners): Observable<Owners>{
    return this.http.put<Owners>(`${this.apiServerUrl}/owners/update`, owners);
    }
    public deleteOwners(ownersId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/owners/delete/${ownersId}`);
  }
}