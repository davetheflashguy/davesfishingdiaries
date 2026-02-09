import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './filters.component';
import { ResultsListComponent } from './results-list.component';
import { CatchesService } from './catches.service';

@Component({
  selector: 'catches-page',
  standalone: true,
  imports: [CommonModule, FiltersComponent, ResultsListComponent],
  providers: [CatchesService],
  template: `
    <div class="page">
      <header class="page-header">
        <h1>My Catches</h1>
      </header>
      <div class="layout">
        <filters-component (filterChange)="onFilter($event)"></filters-component>
        <results-list [filters]="filters"></results-list>
      </div>
    </div>
  `,
  styles: [
    `
      .layout { display:flex; gap:16px; padding:16px }
      filters-component { width: 260px }
      results-list { flex:1 }
    `
  ]
})
export class CatchesPage {
  filters = signal<any>({});

  onFilter(val: any) {
    this.filters.set(val);
  }
}
