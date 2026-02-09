import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'catch-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="card">
      <img [src]="item.photo_url || 'https://via.placeholder.com/120x80'" alt="photo">
      <div class="card-body">
        <h3>{{ item.species }} — {{ item.length_inches || '—' }}"</h3>
        <p><strong>Weight:</strong> {{ item.weight_lbs || '—' }} • <strong>Date:</strong> {{ item.date_caught || '—' }} • <strong>Location:</strong> {{ item.latitude ? (item.latitude + ',' + item.longitude) : (item.latitude === null ? 'Private' : '—') }}</p>
        <p class="notes">Lure: {{ item.lure || '—' }} • {{ item.notes || '' }}</p>
      </div>
    </article>
  `,
  styles: [
    `
      .card{display:flex;gap:12px;background:white;padding:12px;border-radius:8px;border:1px solid #e6e9ef}
      img{width:120px;height:80px;object-fit:cover;border-radius:6px}
      .card-body h3{margin:0}
      .notes{color:#6b7280}
    `
  ]
})
export class CatchCardComponent {
  @Input() item: any;
}
