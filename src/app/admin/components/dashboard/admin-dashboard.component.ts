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

      <main class="dash-main">
        <div class="page-header">
          <div class="nx-page-title">Tableau de bord</div>
          <div class="nx-page-sub">Vue d'ensemble — Administration NexHire</div>
        </div>

        <!-- Forum Card -->
        <div class="nx-card forum-card">
          <div class="forum-body">
            <div class="forum-top">
              <h2 class="forum-name">{{ forum.nom }}</h2>
              <span class="badge-actif">{{ forum.statut }}</span>
            </div>
            <div class="forum-meta">
              <span class="meta-item">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {{ forum.dateDebut }}
              </span>
              <span class="meta-item">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {{ forum.lieu }}
              </span>
            </div>
          </div>
        </div>

        <!-- KPI Cards -->
        <div class="stat-cards">
          <div class="nx-card stat-card">
            <div class="stat-icon stat-icon-blue">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 21h18M3 7v14M21 7v14M6 7V4a1 1 0 011-1h10a1 1 0 011 1v3M6 7h12"/></svg>
            </div>
            <div class="stat-val">{{ totalEntreprises }}</div>
            <div class="stat-label">Total entreprises</div>
          </div>
          <div class="nx-card stat-card">
            <div class="stat-icon stat-icon-green">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
            </div>
            <div class="stat-val">{{ totalRecruteurs }}</div>
            <div class="stat-label">Total recruteurs</div>
          </div>
          <div class="nx-card stat-card">
            <div class="stat-icon stat-icon-orange">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            </div>
            <div class="stat-val">{{ totalCandidatures }}</div>
            <div class="stat-label">Total candidatures</div>
          </div>
        </div>

        <!-- Table -->
        <div class="nx-card table-card">
          <div class="table-header">
            <span class="card-title">Entreprises participantes</span>
          </div>
          <div class="table-scroll">
            <table>
              <thead>
                <tr><th>Entreprise</th><th>Recruteur</th><th>Candidatures</th><th>Statut</th></tr>
              </thead>
              <tbody>
                @for (e of entreprises; track e.id) {
                  <tr>
                    <td class="td-name">{{ e.nom }}</td>
                    <td class="td-muted">{{ e.recruteur }}</td>
                    <td class="td-mono">{{ e.candidatures }}</td>
                    <td>
                      <span [class]="e.statut === 'Actif' ? 'badge-actif' : 'badge-inactif'">{{ e.statut }}</span>
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
    .layout { display: flex; min-height: 100vh; background: var(--bg); }
    .dash-main { flex: 1; padding: 28px; overflow-y: auto; display: flex; flex-direction: column; gap: 20px; }
    .page-header { margin-bottom: 0; }
    .forum-card { padding: 24px; }
    .forum-body { display: flex; flex-direction: column; gap: 10px; }
    .forum-top { display: flex; align-items: center; gap: 12px; }
    .forum-name { font-size: 18px; font-weight: 700; color: var(--text-strong); }
    .forum-meta { display: flex; gap: 20px; }
    .meta-item { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-muted); }
    .badge-actif { display: inline-block; padding: 3px 10px; background: rgba(34,197,94,0.12); color: var(--accent); border-radius: 20px; font-size: 12px; font-weight: 600; }
    .badge-inactif { display: inline-block; padding: 3px 10px; background: rgba(107,114,128,0.15); color: var(--text-muted); border-radius: 20px; font-size: 12px; font-weight: 600; }
    .stat-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .stat-card { padding: 20px 16px; display: flex; flex-direction: column; gap: 8px; }
    .stat-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .stat-icon-blue { color: var(--accent2); background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.25); }
    .stat-icon-green { color: var(--accent); background: rgba(34,197,94,0.12); border: 1px solid rgba(34,197,94,0.25); }
    .stat-icon-orange { color: var(--warning); background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.25); }
    .stat-val { font-family: var(--mono); font-size: 30px; font-weight: 700; color: var(--text); }
    .stat-label { font-size: 12px; color: var(--text-muted); }
    .table-card { overflow: hidden; }
    .table-header { padding: 16px 20px 12px; border-bottom: 1px solid var(--border); }
    .card-title { font-size: 14px; font-weight: 600; color: var(--text); }
    .table-scroll { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    th { padding: 10px 20px; font-size: 11px; color: var(--text-muted); font-weight: 600; text-align: left; letter-spacing: 0.5px; text-transform: uppercase; }
    td { padding: 12px 20px; font-size: 13px; color: var(--text); border-top: 1px solid var(--border); }
    tr:hover td { background: rgba(255,255,255,0.02); }
    .td-name { font-weight: 600; color: var(--text-strong); }
    .td-muted { color: var(--text-muted); }
    .td-mono { font-family: var(--mono); }
    @media (max-width: 900px) { .stat-cards { grid-template-columns: 1fr; } .dash-main { padding: 20px; } }
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
