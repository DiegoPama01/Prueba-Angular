import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';
import { environment } from '../../environments/environment';

export interface StatististicElement {
  month: string;
  quantity: number;
  total_sold: number;
}

@Injectable({ providedIn: 'root' })
export class StatisticsService {
  private base = environment.apiBaseUrl;

  auth = inject(AuthService);
  http = inject(HttpClient);

  fetchStatistics(): Observable<StatististicElement[]> {
    const token = this.auth.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    const options: { headers?: HttpHeaders } = headers ? { headers } : {};
    return this.http.get<StatististicElement[]>(`${this.base}/api/statistics`, options);
  }
}
