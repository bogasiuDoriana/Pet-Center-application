import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Owners } from '../../domain/employee';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Owners[]>{
    return this.http.get<Owners[]>(`${this.apiServerUrl}/employee/all`);
  }

  public addEmployee(employee: Owners): Observable<Owners>{
    return this.http.post<Owners>(`${this.apiServerUrl}/employee/add`, employee);
  }

  public updateEmployee(employee: Owners): Observable<Owners>{
    return this.http.put<Owners>(`${this.apiServerUrl}/employee/update`, employee);
  }

  public deleteEmployee(employeeId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }
}
