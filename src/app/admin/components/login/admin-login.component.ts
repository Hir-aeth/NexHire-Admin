import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-page">
      <!-- LEFT PANEL -->
      <div class="left-panel">
        <div class="left-content">
          <div class="logo">
            <span class="nex">NEX</span><span class="hire">HIRE</span>
          </div>
          <div class="logo-sub">ADMINISTRATEUR</div>
          <div class="separator"></div>

          <div class="features">
            <div class="feature-card">
              <div class="feature-icon">
                <svg width="20" height="20" fill="none" stroke="var(--accent)" stroke-width="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div class="feature-text">
                <div class="feature-title">Gestion des forums</div>
                <div class="feature-desc">Configurez et gérez les événements</div>
              </div>
            </div>

            <div class="feature-card">
              <div class="feature-icon">
                <svg width="20" height="20" fill="none" stroke="var(--accent)" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </div>
              <div class="feature-text">
                <div class="feature-title">Gestion des recruteurs</div>
                <div class="feature-desc">Créez et gérez les comptes recruteurs</div>
              </div>
            </div>

            <div class="feature-card">
              <div class="feature-icon">
                <svg width="20" height="20" fill="none" stroke="var(--accent)" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M3 21h18M3 7v14M21 7v14M6 7V4a1 1 0 011-1h10a1 1 0 011 1v3M6 7h12"/>
                  <path d="M9 11h.01M12 11h.01M15 11h.01"/>
                </svg>
              </div>
              <div class="feature-text">
                <div class="feature-title">Gestion des entreprises</div>
                <div class="feature-desc">Gérez les entreprises participantes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT PANEL -->
      <div class="right-panel">
        @if (!success()) {
          <div class="form-wrapper">
            <h1 class="form-title">Connexion Administrateur</h1>
            <p class="form-subtitle">Accès réservé aux administrateurs autorisés</p>

            <form (ngSubmit)="onLogin()" class="form">
              <div class="field">
                <label class="label">Adresse email</label>
                <input
                  type="email"
                  class="input"
                  placeholder="admin&#64;nexhire.ma"
                  [(ngModel)]="email"
                  name="email"
                />
                @if (submitted && !email) {
                  <span class="err-msg">Email requis</span>
                }
              </div>

              <div class="field">
                <label class="label">Mot de passe</label>
                <div class="password-wrap">
                  <input
                    [type]="showPassword ? 'text' : 'password'"
                    class="input"
                    placeholder="••••••••"
                    [(ngModel)]="password"
                    name="password"
                  />
                  <button type="button" class="eye-btn" (click)="showPassword = !showPassword">
                    @if (showPassword) {
                      <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    } @else {
                      <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    }
                  </button>
                </div>
                @if (submitted && !password) {
                  <span class="err-msg">Mot de passe requis</span>
                }
              </div>

              <button type="submit" class="submit-btn" [disabled]="loading()">
                @if (loading()) {
                  <span class="spinner"></span>
                  Connexion...
                } @else {
                  Se connecter →
                }
              </button>
            </form>

            <p class="demo-hint">Utilisez n'importe quels identifiants pour la démo</p>
          </div>
        } @else {
          <div class="success-wrap">
            <div class="success-icon">✓</div>
            <div class="success-title">Connecté</div>
            <div class="success-sub">Ouverture du tableau de bord...</div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    * { box-sizing: border-box; margin: 0; padding: 0; }

    .login-page {
      display: flex;
      min-height: 100vh;
      background: var(--bg);
    }

    /* ── LEFT ── */
    .left-panel {
      flex: 1;
      background: var(--surface);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 56px;
      border-right: 1px solid var(--border);
    }

    .left-content {
      max-width: 420px;
      width: 100%;
    }

    .logo {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: 1.5px;
    }

    .nex { color: var(--text-strong); }
    .hire { color: var(--accent); }

    .logo-sub {
      font-size: 10px;
      color: var(--text-muted);
      letter-spacing: 3.5px;
      margin-top: 5px;
      text-transform: uppercase;
    }

    .separator {
      width: 64px;
      height: 2px;
      background: var(--accent);
      margin: 24px 0;
      border-radius: 1px;
    }

    .features {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .feature-card {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 16px;
      background: rgba(255,255,255,0.03);
      border-radius: 10px;
      border: 1px solid var(--border);
      transition: border-color 0.15s, background 0.15s;
    }

    .feature-card:hover {
      background: rgba(255,255,255,0.05);
      border-color: rgba(34, 197, 94, 0.25);
    }

    .feature-icon {
      width: 36px;
      height: 36px;
      background: rgba(34, 197, 94, 0.08);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: 1px solid rgba(34, 197, 94, 0.15);
    }

    .feature-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 2px;
    }

    .feature-desc {
      font-size: 11.5px;
      color: var(--text-muted);
      line-height: 1.4;
    }

    /* ── RIGHT ── */
    .right-panel {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 56px;
      background: var(--surface-deep);
    }

    .form-wrapper {
      max-width: 480px;
      width: 100%;
    }

    .form-title {
      font-size: 32px;
      font-weight: 800;
      color: var(--text-strong);
      margin-bottom: 10px;
      line-height: 1.15;
    }

    .form-subtitle {
      font-size: 14px;
      color: var(--text-muted);
      margin-bottom: 40px;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 9px;
    }

    .label {
      font-size: 14px;
      font-weight: 600;
      color: var(--text);
    }

    .input {
      width: 100%;
      padding: 15px 18px;
      background: var(--field);
      border: 1px solid var(--border2);
      border-radius: 12px;
      color: var(--text-muted);
      font-size: 15px;
      outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
      -webkit-appearance: none;
      appearance: none;
      color-scheme: dark;
    }

    .input:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
    }

    .input::placeholder {
      color: var(--text-muted);
    }

    .input:-webkit-autofill,
    .input:-webkit-autofill:hover,
    .input:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0 1000px var(--field) inset !important;
      -webkit-text-fill-color: var(--text-muted) !important;
      caret-color: var(--text-soft);
      border-color: var(--border2);
      transition: background-color 5000s ease-in-out 0s;
    }

    .password-wrap {
      position: relative;
    }

    .password-wrap .input {
      padding-right: 52px;
    }

    .eye-btn {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      color: var(--text-muted);
      transition: color 0.15s;
    }

    .eye-btn:hover { color: var(--text-soft); }

    .submit-btn {
      margin-top: 4px;
      width: 100%;
      min-height: 53px;
      padding: 16px;
      background: var(--accent);
      color: #000;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.15s, transform 0.1s;
      letter-spacing: 0.2px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .submit-btn:hover { background: var(--accent-hover); }
    .submit-btn:active { transform: scale(0.99); }
    .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

    .spinner {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid rgba(0, 0, 0, 0.3);
      border-top-color: #000;
      animation: spin 0.8s linear infinite;
    }

    .err-msg {
      font-size: 12px;
      color: var(--error);
    }

    .demo-hint {
      margin-top: 20px;
      text-align: center;
      font-size: 13px;
      color: var(--text-dim);
    }

    .success-wrap {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    .success-icon {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: rgba(34, 197, 94, 0.12);
      border: 2px solid rgba(34, 197, 94, 0.3);
      font-size: 28px;
      color: var(--accent);
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .success-title {
      font-size: 22px;
      font-weight: 700;
      color: var(--text-strong);
    }

    .success-sub {
      font-size: 13px;
      color: var(--text-muted);
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .login-page { flex-direction: column; }
      .left-panel { padding: 32px 24px; }
      .right-panel { padding: 32px 24px; }
    }
  `]
})
export class AdminLoginComponent {
  email = '';
  password = '';
  showPassword = false;
  submitted = false;
  loading = signal(false);
  success = signal(false);

  constructor(private authService: AdminAuthService) {}

  onLogin(): void {
    this.submitted = true;
    if (!this.email || !this.password) return;

    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      this.success.set(true);
      setTimeout(() => this.authService.login(), 450);
    }, 500);
  }
}
