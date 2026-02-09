import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatchesService } from './catches.service';
import { CatchCardComponent } from './catch-card.component';

@Component({
  selector: 'results-list',
  standalone: true,
  imports: [CommonModule, CatchCardComponent],
  template: `
    <section>
      <div *ngIf="loading">Loading…</div>
      <div *ngIf="!loading && items.length === 0">No catches found.</div>
      <div class="results">
        <catch-card *ngFor="let c of items" [item]="c"></catch-card>
      </div>
    </section>
  `,
  styles: [
    `
      .results{display:flex;flex-direction:column;gap:10px}
    `
  ],
  providers: [CatchesService]
})
export class ResultsListComponent implements OnChanges {
  @Input() filters: any;

  items: any[] = [];
  loading = false;

  constructor(private svc: CatchesService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filters']) {
      this.load();
    }
  }

  load() {
    this.loading = true;
    this.svc.getCatches(this.filters || {}).subscribe({
      next: (r) => { this.items = r; this.loading = false; },
      error: () => { this.items = []; this.loading = false; }
    });
  }
}
