import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CatchListsService, CatchFilter } from './catch-lists.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule}  from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ImageZoomDialog } from './image-zoom-dialog';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catch-list',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatGridListModule, MatProgressSpinnerModule, MatDialogModule, MatIconModule],
  templateUrl: './catch-list.html',
  styleUrl: './catch-list.scss',
  providers: [ CatchListsService ]
})
export class CatchList implements OnInit, OnDestroy {
  @Input() set filters(filter: CatchFilter) {
    this.loadCatches(filter);
  }
  
  @Output() countChange = new EventEmitter<number>();
  
  loading = false;
  items: any[] = [];
  data$!: Observable<any[]>;
  currentFilter: CatchFilter = {};
  private queryParamsSub?: Subscription;
  private isDialogOpen = false;
  private isUpdatingUrl = false;

  constructor(
    private svc: CatchListsService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.queryParamsSub = this.route.queryParams.subscribe(params => {
      // Don't process if we're the ones updating the URL
      if (this.isUpdatingUrl || this.isDialogOpen) {
        return;
      }

      const catchId = params['catchId'];
      if (catchId && this.items.length > 0) {
        const catchItem = this.items.find(item => item.id == catchId);
        if (catchItem) {
          this.openDialogInternal(catchItem.photo_url, catchItem.species, catchItem.water_body);
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.queryParamsSub) {
      this.queryParamsSub.unsubscribe();
    }
  }

  loadCatches(filter: CatchFilter) {
    this.loading = true;
    this.currentFilter = filter;
    this.data$ = this.svc.getCatches(filter);
    this.data$.subscribe({
      next: (data) => {
        this.items = data;
        this.countChange.emit(data.length);
        this.loading = false;
        
        // Check if there's a catchId in URL after data loads (only if dialog not already open)
        if (!this.isDialogOpen && !this.isUpdatingUrl) {
          const catchId = this.route.snapshot.queryParams['catchId'];
          if (catchId) {
            const catchItem = this.items.find(item => item.id == catchId);
            if (catchItem) {
              this.openDialogInternal(catchItem.photo_url, catchItem.species, catchItem.water_body);
            }
          }
        }
      },
      error: (err) => {
        console.error('Error loading catches:', err);
        this.loading = false;
      }
    });
  }

  private openDialogInternal(imageUrl: string, species: string, waterBody?: string) {
    if (this.isDialogOpen) {
      return; // Prevent multiple dialogs
    }

    this.isDialogOpen = true;
    const dialogRef = this.dialog.open(ImageZoomDialog, {
      data: { imageUrl, species, waterBody },
      maxWidth: '90vw',
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isDialogOpen = false;
    });
  }

  openImageDialogById(id: number, imageUrl: string, species: string, waterBody?: string) {
    if (this.isDialogOpen) {
      return; // Prevent multiple dialogs
    }

    // Update URL with catchId
    this.isUpdatingUrl = true;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { catchId: id },
      queryParamsHandling: 'merge'
    }).then(() => {
      this.isUpdatingUrl = false;
    });

    this.isDialogOpen = true;
    const dialogRef = this.dialog.open(ImageZoomDialog, {
      data: { imageUrl, species, waterBody },
      maxWidth: '90vw',
      maxHeight: '90vh',
    });

    // Remove catchId from URL when dialog closes
    dialogRef.afterClosed().subscribe(() => {
      this.isDialogOpen = false;
      this.isUpdatingUrl = true;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { catchId: null },
        queryParamsHandling: 'merge'
      }).then(() => {
        this.isUpdatingUrl = false;
      });
    });
  }
}

