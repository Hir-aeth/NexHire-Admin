import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private readonly KEY = 'admin_auth';

  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    return localStorage.getItem(this.KEY) === 'true';
  }

  login(): void {
    localStorage.setItem(this.KEY, 'true');
    this.router.navigate(['/admin/dashboard']);
  }

  logout(): void {
    localStorage.removeItem(this.KEY);
    this.router.navigate(['/admin/login']);
  }
}
