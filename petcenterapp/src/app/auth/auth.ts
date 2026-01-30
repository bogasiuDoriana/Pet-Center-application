import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AuthStateService } from './auth.stateservice';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css'],
})
export class Auth implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private authStateService: AuthStateService
  ) {}

  ngOnInit(): void {}

  onLogin(loginForm: any): void {
    if (loginForm.invalid) return;

    this.authService.login(
      loginForm.value.email,
      loginForm.value.password
    ).subscribe({
      next: (response: any) => {
        console.log("Login successful:", response);

        this.authStateService.setUser({
        id: response.id,
        message: response.message,
        role: response.role
      });

        if (response.role === 'EMPLOYEE') {
          this.router.navigate(['/employees']);
        } else if (response.role === 'OWNER') {
          this.router.navigate(['/ecommerce'],{ queryParams: { ownerId: response.id } });
        }
      },
      error: () => {
        alert("Invalid credentials");
      }
    });
  }
}

