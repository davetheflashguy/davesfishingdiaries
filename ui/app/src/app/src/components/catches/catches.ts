import { Component, signal } from '@angular/core';
import { CatchHighlight } from '../catch-highlight/catch-highlight';
import { CatchFilters } from '../catch-filters/catch-filters';
import { CatchList } from '../catch-list/catch-list';
import { CatchFilter } from '../catch-list/catch-lists.service';

@Component({
  selector: 'app-catches',
  imports: [CatchHighlight, CatchFilters, CatchList],
  templateUrl: './catches.html',
  styleUrl: './catches.scss',
})
export class Catches {
  currentFilter = signal<CatchFilter>({});

  onFilterChange(filter: CatchFilter) {
    this.currentFilter.set(filter);
  }
}
