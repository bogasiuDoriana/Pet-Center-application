import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { LoginResponse } from "../domain/login";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
}) 
export class AuthService {

  private apiServerUrl = environment.apiBaseUrl
  constructor(private http: HttpClient) { }

  public login(email: string, password: string): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(
    `${this.apiServerUrl}/auth/login`,
    { email, password }
  );
}
}