import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <div class="logo-section">
        <div class="logo">
          <span class="nex">NEX</span><span class="hire">HIRE</span>
        </div>
        <div class="subtitle">Administrateur</div>
      </div>

      <nav class="nav">
        <a routerLink="/admin/dashboard" routerLinkActive="active" class="nav-item">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
          Tableau de bord
        </a>
        <a routerLink="/admin/forums" routerLinkActive="active" class="nav-item">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Forums
        </a>
        <a routerLink="/admin/entreprises" routerLinkActive="active" class="nav-item">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M3 21h18M3 7v14M21 7v14M6 7V4a1 1 0 011-1h10a1 1 0 011 1v3M6 7h12"/>
            <path d="M9 11h.01M12 11h.01M15 11h.01M9 15h.01M12 15h.01M15 15h.01"/>
          </svg>
          Entreprises
        </a>
        <a routerLink="/admin/recruteurs" routerLinkActive="active" class="nav-item">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
          </svg>
          Recruteurs
        </a>
      </nav>

      <div class="sidebar-bottom">
        <div class="profile-card">
          <div class="avatar">AD</div>
          <div class="profile-info">
            <div class="profile-name">Admin</div>
            <div class="profile-email">admin&#64;nexhire.ma</div>
          </div>
        </div>
        <button class="logout-btn" (click)="logout()">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
          Se déconnecter
        </button>
      </div>
    </aside>
  `,
  styles: [`
    :host { display: block; height: 100vh; }

    .sidebar {
      width: 240px;
      min-width: 240px;
      background: #1a1a1a;
      height: 100vh;
      position: sticky;
      top: 0;
      display: flex;
      flex-direction: column;
      border-right: 1px solid #2d2d2d;
      overflow: hidden;
    }

    .logo-section {
      padding: 28px 20px 20px;
      border-bottom: 1px solid #2d2d2d;
    }

    .logo {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: 1px;
      font-family: Arial, sans-serif;
    }

    .nex { color: #ffffff; }
    .hire { color: #22c55e; }

    .subtitle {
      font-size: 11px;
      color: #6b7280;
      margin-top: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .nav {
      flex: 1;
      padding: 16px 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      overflow-y: auto;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 8px;
      color: #9ca3af;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: background 0.15s, color 0.15s;
      font-family: Arial, sans-serif;
    }

    .nav-item:hover {
      background: #252525;
      color: #ffffff;
    }

    .nav-item.active {
      background: rgba(34, 197, 94, 0.12);
      color: #22c55e;
    }

    .nav-item.active svg {
      stroke: #22c55e;
    }

    .sidebar-bottom {
      padding: 16px 12px;
      border-top: 1px solid #2d2d2d;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .profile-card {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      background: #252525;
      border-radius: 8px;
    }

    .avatar {
      width: 34px;
      height: 34px;
      background: #22c55e;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      color: #000000;
      flex-shrink: 0;
      font-family: Arial, sans-serif;
    }

    .profile-info { overflow: hidden; }

    .profile-name {
      font-size: 13px;
      font-weight: 600;
      color: #ffffff;
      font-family: Arial, sans-serif;
    }

    .profile-email {
      font-size: 11px;
      color: #6b7280;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: Arial, sans-serif;
    }

    .logout-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 9px 12px;
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.2);
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.15s;
      font-family: Arial, sans-serif;
    }

    .logout-btn:hover {
      background: rgba(239, 68, 68, 0.2);
    }

    @media (max-width: 768px) {
      .sidebar {
        width: 60px;
        min-width: 60px;
      }
      .logo-section, .subtitle, .nav-item span,
      .profile-info, .logout-btn span { display: none; }
      .nav-item { justify-content: center; padding: 12px; }
      .profile-card { justify-content: center; }
      .logout-btn { padding: 10px; }
    }
  `]
})
export class AdminSidebarComponent {
  constructor(private authService: AdminAuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
