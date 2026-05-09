import { Component, OnInit } from '@angular/core';
import { AdminSidebarComponent } from '../sidebar/admin-sidebar.component';
import { AdminDataService, Entreprise } from '../../services/admin-data.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AdminSidebarComponent],
  template: `
    <div class="layout">
      <app-admin-sidebar></app-admin-sidebar>

      <main class="main">
        <!-- Forum Card -->
        <div class="forum-card">
          <div class="forum-left">
            <div class="forum-header">
              <h2 class="forum-title">{{ forum.nom }}</h2>
              <span class="badge-actif">{{ forum.statut }}</span>
            </div>
            <div class="forum-meta">
              <div class="meta-item">
                <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>{{ forum.dateDebut }}</span>
              </div>
              <div class="meta-item">
                <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{{ forum.lieu }}</span>
              </div>
            </div>
          </div>
          <div class="forum-icon-wrap" style="color: rgba(34,197,94,0.25)">
            <svg width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
        </div>

        <!-- KPI Cards -->
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-icon kpi-icon-blue">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M3 21h18M3 7v14M21 7v14M6 7V4a1 1 0 011-1h10a1 1 0 011 1v3M6 7h12"/>
              </svg>
            </div>
            <div class="kpi-info">
              <div class="kpi-label">Total entreprises</div>
              <div class="kpi-value">{{ totalEntreprises }}</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon kpi-icon-green">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
              </svg>
            </div>
            <div class="kpi-info">
              <div class="kpi-label">Total recruteurs</div>
              <div class="kpi-value">{{ totalRecruteurs }}</div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon kpi-icon-orange">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div class="kpi-info">
              <div class="kpi-label">Total candidatures</div>
              <div class="kpi-value">{{ totalCandidatures }}</div>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="table-card">
          <h3 class="table-title">Entreprises participantes</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Entreprise</th>
                  <th>Recruteur assigné</th>
                  <th>Candidatures reçues</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                @for (e of entreprises; track e.id) {
                  <tr>
                    <td class="td-bold">{{ e.nom }}</td>
                    <td>{{ e.recruteur }}</td>
                    <td>{{ e.candidatures }}</td>
                    <td>
                      <span [class]="e.statut === 'Actif' ? 'badge-actif' : 'badge-inactif'">
                        {{ e.statut }}
                      </span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    * { box-sizing: border-box; margin: 0; padding: 0; }

    .layout {
      display: flex;
      min-height: 100vh;
      background: var(--bg);
    }

    .main {
      flex: 1;
      padding: 32px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    /* ── Forum Card ── */
    .forum-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 28px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .forum-title {
      font-size: 20px;
      font-weight: 700;
      color: var(--text-strong);
      margin-bottom: 10px;
    }

    .forum-header {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }

    .forum-meta {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: var(--text-muted);
    }

    .forum-icon-wrap {
      opacity: 0.6;
      flex-shrink: 0;
    }

    /* ── Badges ── */
    .badge-actif {
      display: inline-block;
      padding: 3px 10px;
      background: rgba(34, 197, 94, 0.12);
      color: var(--accent-hex);
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    .badge-inactif {
      display: inline-block;
      padding: 3px 10px;
      background: rgba(107, 114, 128, 0.15);
      color: var(--text-muted);
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    /* ── KPI Grid ── */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .kpi-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .kpi-icon {
      width: 48px;
      height: 48px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .kpi-icon-blue { background: rgba(59, 130, 246, 0.12); color: var(--accent2); }
    .kpi-icon-green { background: rgba(34, 197, 94, 0.12); color: var(--accent-hex); }
    .kpi-icon-orange { background: rgba(245, 158, 11, 0.12); color: var(--warning); }

    .kpi-label {
      font-size: 13px;
      color: var(--text-muted);
      margin-bottom: 4px;
    }

    .kpi-value {
      font-size: 30px;
      font-weight: 700;
      color: var(--text-strong);
      line-height: 1;
    }

    /* ── Table ── */
    .table-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
    }

    .table-title {
      padding: 20px 24px 16px;
      font-size: 16px;
      font-weight: 600;
      color: var(--text);
      border-bottom: 1px solid var(--border);
    }

    .table-wrap { overflow-x: auto; }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      padding: 12px 24px;
      text-align: left;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background: var(--field);
    }

    td {
      padding: 14px 24px;
      font-size: 14px;
      color: var(--text);
      border-top: 1px solid rgba(255,255,255,0.04);
    }

    .td-bold { color: var(--text-strong); font-weight: 500; }

    tr:hover td { background: rgba(255,255,255,0.02); }

    @media (max-width: 900px) {
      .kpi-grid { grid-template-columns: 1fr; }
      .main { padding: 20px; }
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  forum: any;
  entreprises: Entreprise[] = [];
  totalEntreprises = 0;
  totalRecruteurs = 0;
  totalCandidatures = 0;

  constructor(private dataService: AdminDataService) {}

  ngOnInit(): void {
    this.forum = this.dataService.forum;
    this.entreprises = this.dataService.entreprises;
    this.totalEntreprises = this.dataService.entreprises.length;
    this.totalRecruteurs = this.dataService.recruteurs.length;
    this.totalCandidatures = this.dataService.getTotalCandidatures();
  }
}
