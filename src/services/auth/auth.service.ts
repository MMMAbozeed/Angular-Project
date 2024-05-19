// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'userSession';

  login(email: string, password: string): boolean {
    // Simulate a login check
    const validEmail = 'user@example.com';
    const validPassword = 'password123';

    if (email === validEmail && password === validPassword) {
      // Store user session in local storage
      localStorage.setItem(this.storageKey, JSON.stringify({ email }));
      return true;
    }

    return false;
  }

  logout(): void {
    // Remove user session from local storage
    localStorage.removeItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    // Check if user session exists in local storage
    return localStorage.getItem(this.storageKey) !== null;
  }

  getUser(): any {
    // Get the current user session
    const session = localStorage.getItem(this.storageKey);
    return session ? JSON.parse(session) : null;
  }
}
