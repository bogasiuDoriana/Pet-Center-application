import { Injectable } from "@angular/core";
import { Services } from "../../domain/services";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root',
}) 

export class ServicesService {
    private apiServerUrl = environment.apiBaseUrl
    constructor(private http: HttpClient) { }

    public getServices(): Observable<Services[]>{
      return this.http.get<Services[]>(`${this.apiServerUrl}/services/all`);
    }
    
    public addServices(services: Services): Observable<Services>{
      return this.http.post<Services>(`${this.apiServerUrl}/services/add`, services);
    }   
    public updateServices(services: Services): Observable<Services>{
        return this.http.put<Services>(`${this.apiServerUrl}/services/update`, services);   

    }
    public deleteServices(servicesId: number): Observable<void>{
      return this.http.delete<void>(`${this.apiServerUrl}/services/delete/${servicesId}`);
    }   
}
