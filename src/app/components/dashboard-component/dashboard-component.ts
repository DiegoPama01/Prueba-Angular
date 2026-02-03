import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatMenuModule, MatButtonModule],
  templateUrl: './dashboard-component.html',
})
export class DashboardComponent implements OnInit {
  token: string | null = null;
  auth = inject(AuthService);

  constructor() {}

  ngOnInit(): void {
    this.token = this.auth.getToken();
  }
}
