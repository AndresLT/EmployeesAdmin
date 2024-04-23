import { Routes } from "@angular/router";
import { adminGuard } from "../core/guards/admin.guard";

export const routes: Routes = [
  {
    path: '', redirectTo: 'profile', pathMatch: 'full'
  },
  {
    path: '', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
        path: 'admin', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent), canActivate: [adminGuard]
      },
      {
        path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
      }
    ]
  }
]
