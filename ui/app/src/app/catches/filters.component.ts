import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'filters-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filters">
      <h3>Filters</h3>
      <label>Species</label>
      <input [(ngModel)]="state.species" placeholder="e.g. Striped Bass">

      <label>Location</label>
      <input [(ngModel)]="state.location" placeholder="town or 'Private'">

      <label>Date From</label>
      <input type="date" [(ngModel)]="state.dateFrom">

      <label>Date To</label>
      <input type="date" [(ngModel)]="state.dateTo">

      <button (click)="apply()" class="apply">Apply</button>
      <button (click)="clear()" class="clear">Clear</button>
    </div>
  `,
  styles: [
    `
      .filters { background: white; padding: 12px; border-radius:8px }
      .filters input { width:100%; margin-bottom:8px; padding:8px }
      .apply{background:#2563eb;color:white;padding:8px;border:0;border-radius:6px;width:100%}
      .clear{margin-top:8px;width:100%;padding:8px}
    `
  ]
})
export class FiltersComponent {
  @Output() filterChange = new EventEmitter<any>();

  state: any = {
    species: '',
    location: '',
    dateFrom: '',
    dateTo: ''
  };

  apply() {
    this.filterChange.emit({ ...this.state });
  }

  clear() {
    this.state = { species: '', location: '', dateFrom: '', dateTo: '' };
    this.filterChange.emit({ ...this.state });
  }
}
