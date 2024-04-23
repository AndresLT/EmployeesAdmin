import { Routes } from '@angular/router';
import { LoginComponent } from './feature/login/login.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { AdminComponent } from './feature/admin/admin.component';
import { ProfileComponent } from './feature/profile/profile.component';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./feature/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard', loadChildren: () => import('./feature/feature.routes').then(m => m.routes)
  }
];
