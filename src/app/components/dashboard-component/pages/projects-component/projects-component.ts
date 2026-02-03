import { Component, AfterViewInit, inject, ComponentRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as L from 'leaflet';
import { MarkerDialog } from '../../../dialogs/marker-dialog/marker-dialog';
import { PopupService } from '../../../../services/popup-service';
import { MarkersService, MarkerDto } from '../../../../services/markers-service';

interface Marker {
  id: string;
  lat: number;
  lng: number;
  title: string;
}

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-projects-component',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './projects-component.html',
  styleUrl: './projects-component.css',
})
export class ProjectsComponent implements AfterViewInit {
  private map!: L.Map;
  private dialog = inject(MatDialog);
  private popupService = inject(PopupService);
  private markersService = inject(MarkersService);
  private projectMarkers: Array<{ id: string; marker: L.Marker; data: Marker; compRef?: ComponentRef<any> }> = [];

  ngAfterViewInit(): void {
    
    L.Icon.mergeOptions({
      iconRetinaUrl: '/media/marker-icon-2x.png',
      iconUrl: '/media/marker-icon.png',
      shadowUrl: '/media/marker-shadow.png'
    });

    this.map = L.map('projectsMap').setView([40.4168, -3.7038], 5); //Spain

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.markersService.getMarkers().subscribe((markers: MarkerDto[]) => {
      if (Array.isArray(markers) && markers.length) {
        markers.forEach(m => this.addProjectMarker({ id: m.id, lat: m.lat, lng: m.lng, title: m.title }));
      }
    }, () => {
      const fallback = [{ id: '1', lat: 40.4168, lng: -3.7038, title: 'Madrid' }];
      fallback.forEach(m => this.addProjectMarker(m));
    });
  }

  protected openMarkerDialog() {
    let dialogRef = this.dialog.open(MarkerDialog, {
      height: '400px',
      width: '600px',
    });


    dialogRef.afterClosed().subscribe((res: any) => {
      if (res && res.lat != null && res.lng != null) {
        const payload = { title: res.title || 'Nuevo marcador', lat: res.lat, lng: res.lng };
        this.markersService.addMarker(payload).subscribe((created: MarkerDto) => {
          this.addProjectMarker({ id: created.id, lat: created.lat, lng: created.lng, title: created.title });
        }, (err) => {
          L.circleMarker([res.lat, res.lng], { radius: 8, color: '#3388ff', fillOpacity: 0.9 })
            .addTo(this.map)
            .bindPopup(res.title || 'Nuevo marcador');
        });
      }
    });
  }

  openAddMarkerDialog() {
    this.openMarkerDialog();
  }

  private addProjectMarker(data: Marker) {
    const id = `${data.lat}-${data.lng}`;
    const marker = L.marker([data.lat, data.lng]).addTo(this.map);
    const entry = { id, marker, data };

    const popupContent = this.popupService.createPopupContent({ popup: data.title, lat: data.lat, lng: data.lng }, () => this.openEditMarkerDialog(entry));
    marker.bindPopup(popupContent as any);

    this.projectMarkers.push(entry);
  }

  private openEditMarkerDialog(entry: { id: string; marker: L.Marker; data: Marker; compRef?: ComponentRef<any> }) {
    const dialogRef = this.dialog.open(MarkerDialog, {
      height: '400px',
      width: '600px',
      data: { type: 'edit', title: entry.data.title, lat: entry.data.lat, lng: entry.data.lng }
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res && res.lat != null && res.lng != null) {
        const payload = { title: res.title || entry.data.title, lat: res.lat, lng: res.lng };
        this.markersService.updateMarker(entry.data.id, payload).subscribe((updated: MarkerDto) => {
          entry.data.title = updated.title;
          entry.data.lat = updated.lat;
          entry.data.lng = updated.lng;
          entry.marker.setLatLng([updated.lat, updated.lng]);
          const popupContent = this.popupService.createPopupContent({ popup: entry.data.title, lat: entry.data.lat, lng: entry.data.lng }, () => this.openEditMarkerDialog(entry));
          entry.marker.bindPopup(popupContent as any);
        }, () => {
          entry.data.title = payload.title as string;
          entry.data.lat = payload.lat as number;
          entry.data.lng = payload.lng as number;
          entry.marker.setLatLng([entry.data.lat, entry.data.lng]);
          const popupContent = this.popupService.createPopupContent({ popup: entry.data.title, lat: entry.data.lat, lng: entry.data.lng }, () => this.openEditMarkerDialog(entry));
          entry.marker.bindPopup(popupContent as any);
        });
      }
    });
  }
}
