import { Routes } from '@angular/router';
import { LoginComponent } from './feature/login/login.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { AdminComponent } from './feature/admin/admin.component';
import { ProfileComponent } from './feature/profile/profile.component';
import { loggedGuard } from './core/guards/logged.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./feature/login/login.component').then(m => m.LoginComponent), canActivate: [loggedGuard]
  },
  {
    path: 'dashboard', loadChildren: () => import('./feature/feature.routes').then(m => m.routes), canActivate: [authGuard]
  }
];
