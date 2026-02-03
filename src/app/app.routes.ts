import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';
import { ProjectsComponent } from './components/dashboard-component/pages/projects-component/projects-component';
import { StatisticsComponent } from './components/dashboard-component/pages/statistics-component/statistics-component';

export const routes: Routes = [
	{ path: '', component: LoginComponent },
	{
		path: 'dashboard',
		component: DashboardComponent,
		children: [
			{ path: '', redirectTo: 'projects', pathMatch: 'full' },
			{ path: 'projects', component: ProjectsComponent },
			{ path: 'statistics', component: StatisticsComponent },
		]
	}
];
