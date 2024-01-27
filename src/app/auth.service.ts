// src/app/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  token: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:5268/api/Auth/login';

  constructor(private http: HttpClient) {}

  login(data: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, data);
  }

  saveUserData(data: LoginResponse): void {
    localStorage.setItem('userData', JSON.stringify(data));
  }

  getUserData(): LoginResponse | null {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : null;
  }

  logout(): void {
    localStorage.removeItem('userData');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userData');
  }
}
