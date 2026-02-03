import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-marker-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule],
  templateUrl: './marker-dialog.html',
  styleUrl: './marker-dialog.css',
})
export class MarkerDialog {
  type: string = 'create';
  title: string = '';
  lat: number | null = null;
  lng: number | null = null;

  constructor(private dialogRef: MatDialogRef<MarkerDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.type = data.type || this.type;
      this.title = data.title ?? this.title;
      this.lat = data.lat ?? this.lat;
      this.lng = data.lng ?? this.lng;
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if (this.title && this.lat !== null && this.lng !== null) {
      this.dialogRef.close({ title: this.title, lat: this.lat, lng: this.lng, type: this.type });
    } else {
      alert('Rellena todos los campos (titulo, latitud, longitud)');
    }
  }
}
