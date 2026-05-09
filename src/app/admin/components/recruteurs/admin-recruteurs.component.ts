import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminSidebarComponent } from '../sidebar/admin-sidebar.component';
import { AdminDataService, Recruteur } from '../../services/admin-data.service';

@Component({
  selector: 'app-admin-recruteurs',
  standalone: true,
  imports: [AdminSidebarComponent, FormsModule],
  template: `
    <div class="layout">
      <app-admin-sidebar></app-admin-sidebar>

      <main class="main">
        <!-- Header -->
        <div class="page-header">
          <h1 class="page-title">Gestion des recruteurs</h1>
          <button class="btn-primary" (click)="openAdd()">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Ajouter un recruteur
          </button>
        </div>

        <!-- Search -->
        <div class="search-wrap">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="search-icon" style="color: var(--text-muted)">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            class="search-input"
            type="text"
            placeholder="Rechercher un recruteur..."
            [(ngModel)]="searchQuery"
          />
        </div>

        <!-- Table -->
        <div class="table-card">
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Entreprise</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                @for (r of filtered; track r.id) {
                  <tr>
                    <td>
                      <div class="recruiter-name">
                        <div class="recruiter-avatar">{{ initials(r.nom) }}</div>
                        <span class="td-bold">{{ r.nom }}</span>
                      </div>
                    </td>
                    <td class="td-secondary">{{ r.email }}</td>
                    <td>{{ r.entreprise }}</td>
                    <td>
                      <span [class]="r.statut === 'Actif' ? 'badge-actif' : 'badge-inactif'">
                        {{ r.statut }}
                      </span>
                    </td>
                    <td class="actions-cell">
                      <button class="btn-modifier" (click)="edit(r)">Modifier</button>
                      <button class="btn-desactiver" (click)="toggleStatut(r)">
                        {{ r.statut === 'Actif' ? 'Désactiver' : 'Activer' }}
                      </button>
                      <button class="btn-reinitialiser" (click)="reset(r)">Réinitialiser</button>
                    </td>
                  </tr>
                }
                @if (filtered.length === 0) {
                  <tr>
                    <td colspan="5" class="empty-row">Aucun recruteur trouvé</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal -->
    @if (showModal) {
      <div class="modal-overlay" (click)="closeModal()">
        <div class="modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>{{ isEditing ? 'Modifier le recruteur' : 'Ajouter un recruteur' }}</h3>
            <button class="modal-close" (click)="closeModal()">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="label">Nom complet</label>
              <input class="input" type="text" [(ngModel)]="formData.nom" />
            </div>
            <div class="form-group">
              <label class="label">Email</label>
              <input class="input" type="email" [(ngModel)]="formData.email" />
            </div>
            <div class="form-group">
              <label class="label">Entreprise</label>
              <input class="input" type="text" [(ngModel)]="formData.entreprise" />
            </div>
            <div class="form-group">
              <label class="label">Statut</label>
              <select class="input" [(ngModel)]="formData.statut">
                <option value="Actif">Actif</option>
                <option value="Inactif">Inactif</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-cancel" (click)="closeModal()">Annuler</button>
            <button class="btn-save" (click)="saveModal()">
              {{ isEditing ? 'Enregistrer' : 'Ajouter' }}
            </button>
          </div>
        </div>
      </div>
    }

    @if (resetToast) {
      <div class="toast">Mot de passe réinitialisé avec succès</div>
    }
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
      gap: 20px;
    }

    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .page-title {
      font-size: 22px;
      font-weight: 700;
      color: var(--text-strong);
    }

    .btn-primary {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      background: var(--accent-hex);
      color: #000000;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s;
    }

    .btn-primary:hover { background: #16a34a; }

    .search-wrap { position: relative; }

    .search-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
    }

    .search-input {
      width: 100%;
      padding: 11px 14px 11px 42px;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: var(--text-strong);
      font-size: 14px;
      outline: none;
      transition: border-color 0.15s;
    }

    .search-input:focus { border-color: var(--accent-hex); }
    .search-input::placeholder { color: var(--text-muted); }

    .table-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
    }

    .table-wrap { overflow-x: auto; }

    table { width: 100%; border-collapse: collapse; }

    th {
      padding: 12px 20px;
      text-align: left;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background: var(--field);
    }

    td {
      padding: 14px 20px;
      font-size: 14px;
      color: var(--text);
      border-top: 1px solid rgba(255,255,255,0.04);
    }

    .td-bold { color: var(--text-strong); font-weight: 600; }
    .td-secondary { color: var(--text-soft); font-size: 13px; }

    tr:hover td { background: rgba(255,255,255,0.02); }

    .recruiter-name {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .recruiter-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(34, 197, 94, 0.15);
      color: var(--accent-hex);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 700;
      flex-shrink: 0;
    }

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

    .actions-cell {
      display: flex;
      gap: 6px;
      align-items: center;
      flex-wrap: wrap;
    }

    .btn-modifier {
      padding: 6px 12px;
      background: var(--border);
      color: var(--text);
      border: 1px solid var(--border2);
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      transition: background 0.15s;
      white-space: nowrap;
    }

    .btn-modifier:hover { background: rgba(255,255,255,0.06); }

    .btn-desactiver {
      padding: 6px 12px;
      background: rgba(239, 68, 68, 0.1);
      color: var(--error);
      border: 1px solid rgba(239, 68, 68, 0.2);
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      transition: background 0.15s;
      white-space: nowrap;
    }

    .btn-desactiver:hover { background: rgba(239, 68, 68, 0.2); }

    .btn-reinitialiser {
      padding: 6px 12px;
      background: var(--border);
      color: var(--text);
      border: 1px solid var(--border2);
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      transition: background 0.15s;
      white-space: nowrap;
    }

    .btn-reinitialiser:hover { background: rgba(255,255,255,0.06); }

    .empty-row {
      text-align: center;
      color: var(--text-muted);
      padding: 32px !important;
    }

    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      width: 440px;
      max-width: 95vw;
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px;
      border-bottom: 1px solid var(--border);
    }

    .modal-header h3 {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-strong);
    }

    .modal-close {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--text-muted);
      padding: 4px;
      display: flex;
      align-items: center;
      transition: color 0.15s;
    }

    .modal-close:hover { color: var(--text-strong); }

    .modal-body {
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    .label {
      font-size: 13px;
      font-weight: 500;
      color: var(--text);
    }

    .input {
      width: 100%;
      padding: 10px 14px;
      background: var(--field);
      border: 1px solid var(--border2);
      border-radius: 8px;
      color: var(--text-strong);
      font-size: 14px;
      outline: none;
      transition: border-color 0.15s;
    }

    .input:focus { border-color: var(--accent-hex); }

    select.input option { background: var(--field); }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      padding: 16px 24px;
      border-top: 1px solid var(--border);
    }

    .btn-cancel {
      padding: 9px 20px;
      background: var(--field);
      color: var(--text-soft);
      border: 1px solid var(--border);
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
    }

    .btn-save {
      padding: 9px 20px;
      background: var(--accent-hex);
      color: #000;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s;
    }

    .btn-save:hover { background: #16a34a; }

    .toast {
      position: fixed;
      bottom: 32px;
      right: 32px;
      background: var(--accent-hex);
      color: #000;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 768px) {
      .main { padding: 20px; }
      .actions-cell { flex-direction: column; align-items: flex-start; }
    }

    .main {
      flex: 1;
      padding: 32px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .page-title {
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
    }

    .btn-primary {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
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

    .btn-primary:hover { background: #16a34a; }

    /* Search */
    .search-wrap { position: relative; }

    .search-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
    }

    .search-input {
      width: 100%;
      padding: 11px 14px 11px 42px;
      background: #1a1a1a;
      border: 1px solid #2d2d2d;
      border-radius: 8px;
      color: #ffffff;
      font-size: 14px;
      font-family: Arial, sans-serif;
      outline: none;
      transition: border-color 0.15s;
    }

    .search-input:focus { border-color: #22c55e; }
    .search-input::placeholder { color: #4b5563; }

    /* Table */
    .table-card {
      background: #1a1a1a;
      border: 1px solid #2d2d2d;
      border-radius: 12px;
      overflow: hidden;
    }

    .table-wrap { overflow-x: auto; }

    table { width: 100%; border-collapse: collapse; }

    th {
      padding: 12px 20px;
      text-align: left;
      font-size: 12px;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background: #1f1f1f;
    }

    td {
      padding: 14px 20px;
      font-size: 14px;
      color: #d1d5db;
      border-top: 1px solid #252525;
    }

    .td-bold { color: #ffffff; font-weight: 600; }
    .td-secondary { color: #9ca3af; font-size: 13px; }

    tr:hover td { background: #212121; }

    /* Recruiter cell */
    .recruiter-name {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .recruiter-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(34, 197, 94, 0.15);
      color: #22c55e;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 700;
      flex-shrink: 0;
    }

    /* Badges */
    .badge-actif {
      display: inline-block;
      padding: 3px 10px;
      background: rgba(34, 197, 94, 0.12);
      color: #22c55e;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    .badge-inactif {
      display: inline-block;
      padding: 3px 10px;
      background: rgba(107, 114, 128, 0.15);
      color: #6b7280;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    /* Action buttons */
    .actions-cell {
      display: flex;
      gap: 6px;
      align-items: center;
      flex-wrap: wrap;
    }

    .btn-modifier {
      padding: 6px 12px;
      background: #2d2d2d;
      color: #d1d5db;
      border: 1px solid #3d3d3d;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      font-family: Arial, sans-serif;
      transition: background 0.15s;
      white-space: nowrap;
    }

    .btn-modifier:hover { background: #383838; }

    .btn-desactiver {
      padding: 6px 12px;
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.2);
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      font-family: Arial, sans-serif;
      transition: background 0.15s;
      white-space: nowrap;
    }

    .btn-desactiver:hover { background: rgba(239, 68, 68, 0.2); }

    .btn-reinitialiser {
      padding: 6px 12px;
      background: #2d2d2d;
      color: #d1d5db;
      border: 1px solid #3d3d3d;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      font-family: Arial, sans-serif;
      transition: background 0.15s;
      white-space: nowrap;
    }

    .btn-reinitialiser:hover { background: #383838; }

    .empty-row {
      text-align: center;
      color: #6b7280;
      padding: 32px !important;
    }

    /* Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal {
      background: #1a1a1a;
      border: 1px solid #2d2d2d;
      border-radius: 12px;
      width: 440px;
      max-width: 95vw;
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px;
      border-bottom: 1px solid #2d2d2d;
    }

    .modal-header h3 {
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
    }

    .modal-close {
      background: none;
      border: none;
      cursor: pointer;
      color: #6b7280;
      padding: 4px;
      display: flex;
      align-items: center;
      transition: color 0.15s;
    }

    .modal-close:hover { color: #ffffff; }

    .modal-body {
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 7px;
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

    select.input option { background: #252525; }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      padding: 16px 24px;
      border-top: 1px solid #2d2d2d;
    }

    .btn-cancel {
      padding: 9px 20px;
      background: #252525;
      color: #9ca3af;
      border: 1px solid #2d2d2d;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      font-family: Arial, sans-serif;
    }

    .btn-save {
      padding: 9px 20px;
      background: #22c55e;
      color: #000;
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

    @media (max-width: 768px) {
      .main { padding: 20px; }
      .actions-cell { flex-direction: column; align-items: flex-start; }
    }
  `]
})
export class AdminRecruteursComponent implements OnInit {
  recruteurs: Recruteur[] = [];
  searchQuery = '';
  showModal = false;
  isEditing = false;
  editingId: number | null = null;
  formData: Partial<Recruteur> = {};
  resetToast = false;

  constructor(private dataService: AdminDataService) {}

  ngOnInit(): void {
    this.recruteurs = this.dataService.recruteurs;
  }

  get filtered(): Recruteur[] {
    const q = this.searchQuery.toLowerCase();
    return this.recruteurs.filter(r =>
      r.nom.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.entreprise.toLowerCase().includes(q)
    );
  }

  initials(name: string): string {
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  }

  openAdd(): void {
    this.isEditing = false;
    this.editingId = null;
    this.formData = { nom: '', email: '', entreprise: '', statut: 'Actif' };
    this.showModal = true;
  }

  edit(r: Recruteur): void {
    this.isEditing = true;
    this.editingId = r.id;
    this.formData = { ...r };
    this.showModal = true;
  }

  toggleStatut(r: Recruteur): void {
    r.statut = r.statut === 'Actif' ? 'Inactif' : 'Actif';
  }

  reset(r: Recruteur): void {
    this.resetToast = true;
    setTimeout(() => (this.resetToast = false), 3000);
  }

  saveModal(): void {
    if (this.isEditing && this.editingId !== null) {
      const idx = this.recruteurs.findIndex(x => x.id === this.editingId);
      if (idx !== -1) this.recruteurs[idx] = { ...this.recruteurs[idx], ...this.formData };
    } else {
      const newId = Math.max(...this.recruteurs.map(r => r.id), 0) + 1;
      this.recruteurs.push({ id: newId, ...this.formData } as Recruteur);
    }
    this.closeModal();
  }

  closeModal(): void {
    this.showModal = false;
    this.formData = {};
  }
}
