import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-text">NEX<span>HIRE</span></div>
        <div class="logo-sub">Administrateur</div>
      </div>

      <nav class="nav">
        <a routerLink="/admin/dashboard" routerLinkActive="active" class="nav-item">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
          </svg>
          <span class="nav-label">Tableau de bord</span>
        </a>
        <a routerLink="/admin/forums" routerLinkActive="active" class="nav-item">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span class="nav-label">Forums</span>
        </a>
        <a routerLink="/admin/entreprises" routerLinkActive="active" class="nav-item">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 21h18M3 7v14M21 7v14M6 7V4a1 1 0 011-1h10a1 1 0 011 1v3M6 7h12"/>
          </svg>
          <span class="nav-label">Entreprises</span>
        </a>
        <a routerLink="/admin/recruteurs" routerLinkActive="active" class="nav-item">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
          </svg>
          <span class="nav-label">Recruteurs</span>
        </a>
      </nav>

      <div class="user-card">
        <div class="user-avatar">AD</div>
        <div class="user-info">
          <div class="user-name">Admin</div>
          <div class="user-role">Administrateur</div>
        </div>
      </div>

      <button class="logout-btn" (click)="logout()">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        Se déconnecter
      </button>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 220px;
      height: 100vh;
      background: var(--card);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      overflow: hidden;
      position: sticky;
      top: 0;
    }

    .sidebar-logo {
      padding: 24px 20px;
      border-bottom: 1px solid var(--border);
    }

    .logo-text {
      font-family: var(--mono);
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 2px;
      color: var(--text);
    }

    .logo-text span { color: var(--accent); }

    .logo-sub {
      font-size: 10px;
      color: var(--text-muted);
      letter-spacing: 1px;
      margin-top: 2px;
    }

    .nav {
      flex: 1;
      padding: 12px 10px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 8px;
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      width: 100%;
      text-align: left;
      transition: all 0.15s;
      position: relative;
      text-decoration: none;
    }

    .nav-item:hover { background: rgba(255,255,255,0.04); color: var(--text); }

    .nav-item.active { background: rgba(34,197,94,0.1); color: var(--accent); }

    .nav-icon { width: 18px; height: 18px; flex-shrink: 0; }

    .nav-label { flex: 1; }

    .user-card {
      margin: 0 10px 6px;
      padding: 12px;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .user-avatar {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: rgba(34,197,94,0.15);
      color: var(--accent);
      font-size: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .user-name { font-size: 12px; font-weight: 600; color: var(--text); }

    .user-role { font-size: 10px; color: var(--text-muted); margin-top: 1px; }

    .logout-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 10px 12px;
      padding: 10px 12px;
      background: rgba(239,68,68,0.06);
      border: 1px solid rgba(239,68,68,0.15);
      border-radius: 8px;
      color: var(--error);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      width: calc(100% - 20px);
      text-align: left;
      transition: all 0.15s;
    }

    .logout-btn:hover { background: rgba(239,68,68,0.12); border-color: rgba(239,68,68,0.3); }

    @media (max-width: 768px) {
      .sidebar { width: 60px; }
      .sidebar-logo, .logo-sub, .nav-label, .user-info { display: none; }
      .nav-item { justify-content: center; padding: 12px; }
      .user-card { justify-content: center; }
      .logout-btn { justify-content: center; width: calc(100% - 20px); }
    }
  `]
})
export class AdminSidebarComponent {
  constructor(private authService: AdminAuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
