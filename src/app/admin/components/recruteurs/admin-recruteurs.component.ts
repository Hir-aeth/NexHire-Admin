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
        <div class="page-header">
          <div>
            <div class="nx-page-title">Recruteurs</div>
            <div class="nx-page-sub">{{ filtered.length }} recruteur(s)</div>
          </div>
          <button class="nx-btn-primary add-btn" (click)="openAdd()">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Ajouter
          </button>
        </div>

        <div class="search-box">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="search-ico"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input class="search-input" type="text" placeholder="Rechercher un recruteur..." [(ngModel)]="searchQuery" />
        </div>

        <div class="nx-card table-card">
          <div class="table-scroll">
            <table>
              <thead>
                <tr><th>Nom</th><th>Email</th><th>Entreprise</th><th>Statut</th><th>Actions</th></tr>
              </thead>
              <tbody>
                @for (r of filtered; track r.id) {
                  <tr>
                    <td>
                      <div class="user-cell">
                        <div class="user-avatar-sm">{{ initials(r.nom) }}</div>
                        <span class="td-name">{{ r.nom }}</span>
                      </div>
                    </td>
                    <td class="td-muted">{{ r.email }}</td>
                    <td class="td-muted">{{ r.entreprise }}</td>
                    <td><span [class]="r.statut === 'Actif' ? 'badge-green' : 'badge-gray'">{{ r.statut }}</span></td>
                    <td><div class="action-cells"><button class="action-btn action-edit" (click)="edit(r)">Modifier</button><button class="action-btn action-toggle" (click)="toggleStatut(r)">{{ r.statut === 'Actif' ? 'Désactiver' : 'Activer' }}</button><button class="action-btn action-reset" (click)="reset(r)">Réinit.</button></div></td>
                  </tr>
                }
                @if (filtered.length === 0) { <tr><td colspan="5" class="empty-row">Aucun recruteur trouvé</td></tr> }
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>

    @if (showModal) {
      <div class="modal-overlay" (click)="closeModal()">
        <div class="modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>{{ isEditing ? 'Modifier le recruteur' : 'Ajouter un recruteur' }}</h3>
            <button class="modal-x" (click)="closeModal()"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
          </div>
          <div class="modal-body">
            <div class="field"><label class="label">Nom complet</label><input class="field-input" type="text" [(ngModel)]="formData.nom" /></div>
            <div class="field"><label class="label">Email</label><input class="field-input" type="email" [(ngModel)]="formData.email" /></div>
            <div class="field"><label class="label">Entreprise</label><input class="field-input" type="text" [(ngModel)]="formData.entreprise" /></div>
            <div class="field"><label class="label">Statut</label><select class="field-input" [(ngModel)]="formData.statut"><option value="Actif">Actif</option><option value="Inactif">Inactif</option></select></div>
          </div>
          <div class="modal-footer">
            <button class="nx-btn-ghost" style="padding:9px 20px;font-size:14px" (click)="closeModal()">Annuler</button>
            <button class="nx-btn-primary" style="padding:9px 20px;font-size:14px" (click)="saveModal()">{{ isEditing ? 'Enregistrer' : 'Ajouter' }}</button>
          </div>
        </div>
      </div>
    }

    @if (resetToast) {
      <div class="toast">Mot de passe réinitialisé avec succès</div>
    }
  `,
  styles: [`
    .layout { display: flex; min-height: 100vh; background: var(--bg); }
    .main { flex: 1; padding: 28px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }
    .page-header { display: flex; align-items: center; justify-content: space-between; }
    .add-btn { display: flex; align-items: center; gap: 8px; padding: 10px 18px; font-size: 14px; }
    .search-box { position: relative; }
    .search-ico { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
    .search-input { width: 100%; padding: 12px 14px 12px 42px; font-size: 14px; box-sizing: border-box; }
    .table-card { overflow: hidden; }
    .table-scroll { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    th { padding: 10px 20px; font-size: 11px; color: var(--text-muted); font-weight: 600; text-align: left; letter-spacing: 0.5px; text-transform: uppercase; }
    td { padding: 12px 20px; font-size: 13px; color: var(--text); border-top: 1px solid var(--border); }
    tr:hover td { background: rgba(255,255,255,0.02); }
    .td-name { font-weight: 600; color: var(--text-strong); }
    .td-muted { color: var(--text-muted); }
    .user-cell { display: flex; align-items: center; gap: 10px; }
    .user-avatar-sm { width: 30px; height: 30px; border-radius: 50%; background: rgba(34,197,94,0.15); color: var(--accent); font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .badge-green { display: inline-block; padding: 3px 10px; background: rgba(34,197,94,0.12); color: var(--accent); border-radius: 20px; font-size: 12px; font-weight: 600; }
    .badge-gray { display: inline-block; padding: 3px 10px; background: rgba(107,114,128,0.15); color: var(--text-muted); border-radius: 20px; font-size: 12px; font-weight: 600; }
    .action-cells { display: flex; gap: 6px; }
    .action-btn { padding: 5px 10px; border-radius: 6px; font-size: 11px; cursor: pointer; border: none; transition: background 0.15s; white-space: nowrap; }
    .action-edit { background: var(--border); color: var(--text); border: 1px solid var(--border2); }
    .action-edit:hover { background: rgba(255,255,255,0.06); }
    .action-toggle { background: rgba(239,68,68,0.1); color: var(--error); border: 1px solid rgba(239,68,68,0.2); }
    .action-toggle:hover { background: rgba(239,68,68,0.2); }
    .action-reset { background: var(--border); color: var(--text); border: 1px solid var(--border2); }
    .action-reset:hover { background: rgba(255,255,255,0.06); }
    .empty-row { text-align: center; padding: 32px; color: var(--text-muted); }
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal { background: var(--card); border: 1px solid var(--border); border-radius: 12px; width: 440px; max-width: 95vw; }
    .modal-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; border-bottom: 1px solid var(--border); }
    .modal-header h3 { font-size: 16px; font-weight: 600; color: var(--text-strong); }
    .modal-x { background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px; display: flex; align-items: center; transition: color 0.15s; }
    .modal-x:hover { color: var(--text-strong); }
    .modal-body { padding: 20px 24px; display: flex; flex-direction: column; gap: 16px; }
    .field { display: flex; flex-direction: column; gap: 7px; }
    .label { font-size: 13px; font-weight: 500; color: var(--text); }
    .field-input { width: 100%; padding: 10px 14px; font-size: 14px; box-sizing: border-box; }
    .modal-footer { display: flex; justify-content: flex-end; gap: 10px; padding: 16px 24px; border-top: 1px solid var(--border); }
    .toast { position: fixed; bottom: 32px; right: 32px; background: var(--accent); color: #000; padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; animation: fadeIn 0.2s ease; z-index: 100; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @media (max-width: 768px) { .main { padding: 20px; } .action-cells { flex-direction: column; align-items: flex-start; } }
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
