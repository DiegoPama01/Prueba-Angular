import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginResponse {
  token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  login(name: string, email: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.base}/api/login`, { name, email }).pipe(
      tap((res) => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

}
