// src/app/login/login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../auth.service'; // Adjust the path as necessary

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {

    const loginData = {
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe
    };

    this.authService.login(loginData).subscribe({
      next: (response: LoginResponse) => {
        this.authService.saveUserData(response);
        this.router.navigate(['/chat']); // or any other route after successful login
      },
      error: (error) => {
        console.error(error);
        // Optionally, handle login error, e.g., showing an error message
      }
      // 'complete' is optional and typically not needed for http requests
    });
  }
}