import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminSidebarComponent } from '../sidebar/admin-sidebar.component';
import { AdminDataService } from '../../services/admin-data.service';

@Component({
  selector: 'app-admin-forums',
  standalone: true,
  imports: [AdminSidebarComponent, FormsModule],
  template: `
    <div class="layout">
      <app-admin-sidebar></app-admin-sidebar>

      <main class="main">
        <div class="page-header">
          <div class="nx-page-title">Configuration du forum</div>
          <div class="nx-page-sub">Paramètres de l'événement en cours</div>
        </div>

        <div class="content-grid">
          <!-- Forum Form -->
          <div class="nx-card form-card">
            <div class="form-group">
              <label class="label">Nom du forum</label>
              <input class="form-input" type="text" [(ngModel)]="forum.nom" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="label">Date de début</label>
                <input class="form-input" type="text" [(ngModel)]="forum.dateDebut" placeholder="JJ/MM/AAAA" />
              </div>
              <div class="form-group">
                <label class="label">Date de fin</label>
                <input class="form-input" type="text" [(ngModel)]="forum.dateFin" placeholder="JJ/MM/AAAA" />
              </div>
            </div>
            <div class="form-group">
              <label class="label">Lieu</label>
              <input class="form-input" type="text" [(ngModel)]="forum.lieu" />
            </div>
            <div class="form-group">
              <label class="label">Description</label>
              <textarea class="form-input form-textarea" [(ngModel)]="forum.description" rows="4"></textarea>
            </div>
          </div>

          <!-- Companies Section -->
          <div class="nx-card companies-card">
            <div class="card-section-title">Entreprises participantes</div>
            <div class="companies-list">
              @for (company of companies; track company; let i = $index) {
                <div class="company-row">
                  <span class="company-name">
                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="color:var(--text-muted)"><path d="M3 21h18M3 7v14M21 7v14M6 7V4a1 1 0 011-1h10a1 1 0 011 1v3M6 7h12"/></svg>
                    {{ company }}
                  </span>
                  <button class="remove-btn" (click)="removeCompany(i)">
                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
              }
            </div>
            <div class="add-row">
              <input class="form-input add-input" type="text" placeholder="Nom de l'entreprise" [(ngModel)]="newCompany" (keydown.enter)="addCompany()" />
              <button class="add-btn" (click)="addCompany()">+ Ajouter</button>
            </div>
          </div>
        </div>

        <div class="actions-bar">
          <button class="nx-btn-ghost" style="padding:10px 24px;font-size:14px">Annuler</button>
          <button class="nx-btn-primary" style="padding:10px 24px;font-size:14px;display:flex;align-items:center;gap:8px" (click)="save()">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Sauvegarder
          </button>
        </div>

        @if (saved) {
          <div class="toast">Modifications sauvegardées avec succès</div>
        }
      </main>
    </div>
  `,
  styles: [`
    .layout { display: flex; min-height: 100vh; background: var(--bg); }
    .main { flex: 1; padding: 28px; overflow-y: auto; position: relative; display: flex; flex-direction: column; gap: 20px; }
    .page-header { margin-bottom: 0; }
    .content-grid { display: grid; grid-template-columns: 1fr 380px; gap: 20px; align-items: start; }
    .form-card { padding: 24px; display: flex; flex-direction: column; gap: 0; }
    .form-group { display: flex; flex-direction: column; gap: 7px; margin-bottom: 20px; }
    .form-group:last-child { margin-bottom: 0; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .label { font-size: 13px; font-weight: 500; color: var(--text); }
    .form-input { width: 100%; padding: 12px 14px; font-size: 14px; box-sizing: border-box; }
    .form-input::placeholder { color: var(--text-muted); }
    .form-textarea { resize: vertical; line-height: 1.5; }
    .companies-card { padding: 20px; }
    .card-section-title { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 14px; }
    .companies-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
    .company-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: var(--field); border-radius: 8px; border: 1px solid var(--border); }
    .company-name { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text); }
    .remove-btn { background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px; border-radius: 4px; display: flex; align-items: center; transition: color 0.15s, background 0.15s; }
    .remove-btn:hover { color: var(--error); background: rgba(239,68,68,0.1); }
    .add-row { display: flex; gap: 10px; }
    .add-input { flex: 1; }
    .add-btn { padding: 10px 16px; background: var(--accent); color: #000; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: background 0.15s; }
    .add-btn:hover { background: var(--accent-hover); }
    .actions-bar { display: flex; justify-content: flex-end; gap: 12px; }
    .toast { position: fixed; bottom: 32px; right: 32px; background: var(--accent); color: #000; padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; animation: fadeIn 0.2s ease; z-index: 100; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @media (max-width: 900px) { .content-grid { grid-template-columns: 1fr; } .main { padding: 20px; } }
  `]
})
export class AdminForumsComponent implements OnInit {
  forum: any = {};
  companies: string[] = [];
  newCompany = '';
  saved = false;

  constructor(private dataService: AdminDataService) {}

  ngOnInit(): void {
    this.forum = { ...this.dataService.forum };
    this.companies = this.dataService.entreprises.map(e => e.nom);
  }

  addCompany(): void {
    const name = this.newCompany.trim();
    if (name && !this.companies.includes(name)) {
      this.companies.push(name);
      this.newCompany = '';
    }
  }

  removeCompany(index: number): void {
    this.companies.splice(index, 1);
  }

  save(): void {
    Object.assign(this.dataService.forum, this.forum);
    this.saved = true;
    setTimeout(() => (this.saved = false), 3000);
  }
}
