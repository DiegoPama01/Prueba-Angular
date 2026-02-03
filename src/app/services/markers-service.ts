import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';
import { environment } from '../../environments/environment';

export interface MarkerDto {
    id: string;
    lat: number;
    lng: number;
    title: string;
}

@Injectable({ providedIn: 'root' })
export class MarkersService {
    private base = environment.apiBaseUrl;

    auth = inject(AuthService);
    http = inject(HttpClient);

    private authHeaders() {
        const token = this.auth.getToken();
        return token ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) } : {};
    }

    getMarkers(): Observable<MarkerDto[]> {
        return this.http.get<MarkerDto[]>(`${this.base}/api/markers`, this.authHeaders());
    }

    addMarker(marker: Partial<MarkerDto>): Observable<MarkerDto> {
        return this.http.post<MarkerDto>(`${this.base}/api/markers`, marker, this.authHeaders());
    }

    updateMarker(id: string, marker: Partial<MarkerDto>): Observable<MarkerDto> {
        return this.http.put<MarkerDto>(`${this.base}/api/markers/${encodeURIComponent(id)}`, marker, this.authHeaders());
    }
}
