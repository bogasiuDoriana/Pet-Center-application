// auth-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../domain/login';


@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private userSubject = new BehaviorSubject<LoginResponse | null>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: LoginResponse) {
    this.userSubject.next(user);
  }

  getUser(): LoginResponse | null {
    return this.userSubject.getValue();
  }
}
