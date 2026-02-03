import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/login-component/login-component').then(m => m.LoginComponent) },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard-component/dashboard-component').then(m => m.DashboardComponent),
    children: [
      { path: '', redirectTo: 'projects', pathMatch: 'full' },
      { path: 'projects', loadComponent: () => import('./components/dashboard-component/pages/projects-component/projects-component').then(m => m.ProjectsComponent) },
      { path: 'statistics', loadComponent: () => import('./components/dashboard-component/pages/statistics-component/statistics-component').then(m => m.StatisticsComponent) },
    ]
  }
];
