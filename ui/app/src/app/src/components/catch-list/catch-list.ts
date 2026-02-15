import { Component, Input } from '@angular/core';
import { CatchListsService, CatchFilter } from './catch-lists.service';
import { Observable } from 'rxjs/internal/Observable';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule}  from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-catch-list',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatGridListModule, MatProgressSpinnerModule],
  templateUrl: './catch-list.html',
  styleUrl: './catch-list.scss',
  providers: [ CatchListsService ]
})
export class CatchList {
  @Input() set filters(filter: CatchFilter) {
    if (filter) {
      this.loadCatches(filter);
    }
  }
  
  loading = false;
  items: any[] = [];
  data$!: Observable<any[]>;
  currentFilter: CatchFilter = {};

  constructor(private svc: CatchListsService) {}

  ngOnInit() {
    this.loadCatches({});
  }

  loadCatches(filter: CatchFilter) {
    this.loading = true;
    this.currentFilter = filter;
    this.data$ = this.svc.getCatches(filter);
    this.data$.subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading catches:', err);
        this.loading = false;
      }
    });
  }
}
