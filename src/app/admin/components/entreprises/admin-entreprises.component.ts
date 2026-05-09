import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminSidebarComponent } from '../sidebar/admin-sidebar.component';
import { AdminDataService, Entreprise } from '../../services/admin-data.service';

@Component({
  selector: 'app-admin-entreprises',
  standalone: true,
  imports: [AdminSidebarComponent, FormsModule],
  template: `
    <div class="layout">
      <app-admin-sidebar></app-admin-sidebar>

      <main class="main">
        <!-- Header -->
        <div class="page-header">
          <h1 class="page-title">Entreprises</h1>
          <button class="btn-primary" (click)="openAdd()">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Ajouter une entreprise
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
            placeholder="Rechercher une entreprise..."
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
                  <th>Secteur</th>
                  <th>Recruteur</th>
                  <th>Candidatures</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                @for (e of filtered; track e.id) {
                  <tr>
                    <td class="td-bold">{{ e.nom }}</td>
                    <td>{{ e.secteur }}</td>
                    <td>{{ e.recruteur }}</td>
                    <td>{{ e.candidatures }}</td>
                    <td>
                      <span [class]="e.statut === 'Actif' ? 'badge-actif' : 'badge-inactif'">
                        {{ e.statut }}
                      </span>
                    </td>
                    <td class="actions-cell">
                      <button class="btn-modifier" (click)="edit(e)">Modifier</button>
                      <button class="btn-supprimer" (click)="delete(e)">Supprimer</button>
                    </td>
                  </tr>
                }
                @if (filtered.length === 0) {
                  <tr>
                    <td colspan="6" class="empty-row">Aucune entreprise trouvée</td>
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
            <h3>{{ isEditing ? 'Modifier l\'entreprise' : 'Ajouter une entreprise' }}</h3>
            <button class="modal-close" (click)="closeModal()">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="label">Nom</label>
              <input class="input" type="text" [(ngModel)]="formData.nom" />
            </div>
            <div class="form-group">
              <label class="label">Secteur</label>
              <input class="input" type="text" [(ngModel)]="formData.secteur" />
            </div>
            <div class="form-group">
              <label class="label">Recruteur</label>
              <input class="input" type="text" [(ngModel)]="formData.recruteur" />
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

    tr:hover td { background: rgba(255,255,255,0.02); }

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
      gap: 8px;
      align-items: center;
    }

    .btn-modifier {
      padding: 6px 14px;
      background: var(--border);
      color: var(--text);
      border: 1px solid var(--border2);
      border-radius: 6px;
      font-size: 13px;
      cursor: pointer;
      transition: background 0.15s;
    }

    .btn-modifier:hover { background: rgba(255,255,255,0.06); }

    .btn-supprimer {
      padding: 6px 14px;
      background: rgba(239, 68, 68, 0.1);
      color: var(--error);
      border: 1px solid rgba(239, 68, 68, 0.2);
      border-radius: 6px;
      font-size: 13px;
      cursor: pointer;
      transition: background 0.15s;
    }

    .btn-supprimer:hover { background: rgba(239, 68, 68, 0.2); }

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

    @media (max-width: 768px) {
      .main { padding: 20px; }
    }
  `]
})
export class AdminEntreprisesComponent implements OnInit {
  entreprises: Entreprise[] = [];
  searchQuery = '';
  showModal = false;
  isEditing = false;
  editingId: number | null = null;
  formData: Partial<Entreprise> = {};

  constructor(private dataService: AdminDataService) {}

  ngOnInit(): void {
    this.entreprises = this.dataService.entreprises;
  }

  get filtered(): Entreprise[] {
    const q = this.searchQuery.toLowerCase();
    return this.entreprises.filter(e =>
      e.nom.toLowerCase().includes(q) ||
      e.secteur.toLowerCase().includes(q) ||
      e.recruteur.toLowerCase().includes(q)
    );
  }

  openAdd(): void {
    this.isEditing = false;
    this.editingId = null;
    this.formData = { nom: '', secteur: '', recruteur: '', candidatures: 0, statut: 'Actif' };
    this.showModal = true;
  }

  edit(e: Entreprise): void {
    this.isEditing = true;
    this.editingId = e.id;
    this.formData = { ...e };
    this.showModal = true;
  }

  delete(e: Entreprise): void {
    const idx = this.entreprises.findIndex(x => x.id === e.id);
    if (idx !== -1) this.entreprises.splice(idx, 1);
  }

  saveModal(): void {
    if (this.isEditing && this.editingId !== null) {
      const idx = this.entreprises.findIndex(x => x.id === this.editingId);
      if (idx !== -1) this.entreprises[idx] = { ...this.entreprises[idx], ...this.formData };
    } else {
      const newId = Math.max(...this.entreprises.map(e => e.id), 0) + 1;
      this.entreprises.push({ id: newId, candidatures: 0, ...this.formData } as Entreprise);
    }
    this.closeModal();
  }

  closeModal(): void {
    this.showModal = false;
    this.formData = {};
  }
}
