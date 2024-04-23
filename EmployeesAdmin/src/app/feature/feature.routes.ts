import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '', redirectTo: 'profile', pathMatch: 'full'
  },
  {
    path: '', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
        path: 'admin', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)
      },
      {
        path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
      }
    ]
  }
]
