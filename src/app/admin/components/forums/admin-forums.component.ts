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
          <h1 class="page-title">Configuration du forum</h1>
        </div>

        <div class="content-grid">
          <!-- Forum Form -->
          <div class="card form-card">
            <div class="form-group">
              <label class="label">Nom du forum</label>
              <input class="input" type="text" [(ngModel)]="forum.nom" />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="label">Date de début</label>
                <input class="input" type="text" [(ngModel)]="forum.dateDebut" placeholder="JJ/MM/AAAA" />
              </div>
              <div class="form-group">
                <label class="label">Date de fin</label>
                <input class="input" type="text" [(ngModel)]="forum.dateFin" placeholder="JJ/MM/AAAA" />
              </div>
            </div>

            <div class="form-group">
              <label class="label">Lieu</label>
              <input class="input" type="text" [(ngModel)]="forum.lieu" />
            </div>

            <div class="form-group">
              <label class="label">Description</label>
              <textarea class="input textarea" [(ngModel)]="forum.description" rows="4"></textarea>
            </div>
          </div>

          <!-- Companies Section -->
          <div class="card companies-card">
            <h3 class="section-title">Entreprises participantes</h3>
            <div class="companies-list">
              @for (company of companies; track company; let i = $index) {
                <div class="company-row">
                  <div class="company-name">
                    <svg width="14" height="14" fill="none" stroke="#6b7280" stroke-width="2" viewBox="0 0 24 24">
                      <path d="M3 21h18M3 7v14M21 7v14M6 7V4a1 1 0 011-1h10a1 1 0 011 1v3M6 7h12"/>
                    </svg>
                    {{ company }}
                  </div>
                  <button class="remove-btn" (click)="removeCompany(i)" title="Supprimer">
                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              }
            </div>

            <div class="add-company-row">
              <input
                class="input add-input"
                type="text"
                placeholder="Nom de l'entreprise"
                [(ngModel)]="newCompany"
                (keydown.enter)="addCompany()"
              />
              <button class="add-btn" (click)="addCompany()">+ Ajouter</button>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="actions">
          <button class="btn-cancel">Annuler</button>
          <button class="btn-save" (click)="save()">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
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
    * { box-sizing: border-box; margin: 0; padding: 0; }

    .layout {
      display: flex;
      min-height: 100vh;
      background: #0a0a0a;
      font-family: Arial, sans-serif;
    }

    .main {
      flex: 1;
      padding: 32px;
      overflow-y: auto;
      position: relative;
    }

    .page-header {
      margin-bottom: 28px;
    }

    .page-title {
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 24px;
      align-items: start;
    }

    .card {
      background: #1a1a1a;
      border: 1px solid #2d2d2d;
      border-radius: 12px;
      padding: 24px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 7px;
      margin-bottom: 20px;
    }

    .form-group:last-child { margin-bottom: 0; }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 20px;
    }

    .label {
      font-size: 13px;
      font-weight: 500;
      color: #d1d5db;
    }

    .input {
      width: 100%;
      padding: 10px 14px;
      background: #252525;
      border: 1px solid #2d2d2d;
      border-radius: 8px;
      color: #ffffff;
      font-size: 14px;
      font-family: Arial, sans-serif;
      outline: none;
      transition: border-color 0.15s;
    }

    .input:focus { border-color: #22c55e; }

    .input::placeholder { color: #4b5563; }

    .textarea {
      resize: vertical;
      line-height: 1.5;
    }

    /* Companies */
    .section-title {
      font-size: 15px;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 16px;
    }

    .companies-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 16px;
    }

    .company-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      background: #252525;
      border-radius: 8px;
      border: 1px solid #2d2d2d;
    }

    .company-name {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #d1d5db;
    }

    .remove-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #4b5563;
      padding: 4px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      transition: color 0.15s, background 0.15s;
    }

    .remove-btn:hover {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
    }

    .add-company-row {
      display: flex;
      gap: 10px;
    }

    .add-input { flex: 1; }

    .add-btn {
      padding: 10px 16px;
      background: #22c55e;
      color: #000000;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      font-family: Arial, sans-serif;
      transition: background 0.15s;
    }

    .add-btn:hover { background: #16a34a; }

    /* Actions */
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 28px;
    }

    .btn-cancel {
      padding: 10px 24px;
      background: #252525;
      color: #9ca3af;
      border: 1px solid #2d2d2d;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      font-family: Arial, sans-serif;
      transition: background 0.15s;
    }

    .btn-cancel:hover { background: #2d2d2d; }

    .btn-save {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 24px;
      background: #22c55e;
      color: #000000;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      font-family: Arial, sans-serif;
      transition: background 0.15s;
    }

    .btn-save:hover { background: #16a34a; }

    .toast {
      position: fixed;
      bottom: 32px;
      right: 32px;
      background: #22c55e;
      color: #000;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      font-family: Arial, sans-serif;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 900px) {
      .content-grid { grid-template-columns: 1fr; }
      .main { padding: 20px; }
    }
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
