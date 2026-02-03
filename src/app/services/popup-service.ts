import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class PopupService {
  constructor() { }

  createPopupContent(data: { popup?: string; lat?: number; lng?: number }, onEdit: (d: any) => void): HTMLElement {
    const div = document.createElement('div');
    div.className = 'popup-content';

    const h3 = document.createElement('h3');
    h3.textContent = data.popup ?? '';
    div.appendChild(h3);

    const btn = document.createElement('button');
    btn.textContent = 'Editar';
    btn.className = 'popup-edit-btn';
    btn.style.cursor = 'pointer';
    btn.style.padding = '6px 12px';
    btn.style.background = '#1976d2';
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.borderRadius = '4px';
    btn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      onEdit(data);
    });

    div.appendChild(btn);

    return div;
  }
}