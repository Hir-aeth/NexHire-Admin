import { Routes } from '@angular/router';
import { adminAuthGuard } from './guards/admin-auth.guard';

export const adminRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/admin-login.component').then(m => m.AdminLoginComponent)
  },
  {
    path: 'dashboard',
    canActivate: [adminAuthGuard],
    loadComponent: () =>
      import('./components/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  {
    path: 'forums',
    canActivate: [adminAuthGuard],
    loadComponent: () =>
      import('./components/forums/admin-forums.component').then(m => m.AdminForumsComponent)
  },
  {
    path: 'entreprises',
    canActivate: [adminAuthGuard],
    loadComponent: () =>
      import('./components/entreprises/admin-entreprises.component').then(m => m.AdminEntreprisesComponent)
  },
  {
    path: 'recruteurs',
    canActivate: [adminAuthGuard],
    loadComponent: () =>
      import('./components/recruteurs/admin-recruteurs.component').then(m => m.AdminRecruteursComponent)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
