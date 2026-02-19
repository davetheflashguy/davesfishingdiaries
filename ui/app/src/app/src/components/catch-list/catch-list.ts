import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CatchListsService, CatchFilter } from './catch-lists.service';
import { Subscription } from 'rxjs';
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
export class CatchList implements OnInit, OnDestroy, AfterViewInit {
  @Input() set filters(filter: CatchFilter) {
    this.resetAndLoadCatches(filter);
  }
  
  @Output() countChange = new EventEmitter<number>();
  @ViewChild('loadMoreTrigger', { read: ElementRef }) loadMoreTrigger?: ElementRef;
  
  loading = false;
  loadingMore = false;
  items: any[] = [];
  currentFilter: CatchFilter = {};
  private queryParamsSub?: Subscription;
  private isDialogOpen = false;
  private isUpdatingUrl = false;
  private intersectionObserver?: IntersectionObserver;
  private pageSize = 20;
  private currentOffset = 0;
  public hasMoreData = true;
  private totalCount = 0;

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

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.queryParamsSub) {
      this.queryParamsSub.unsubscribe();
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private setupIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.loading && !this.loadingMore && this.hasMoreData) {
            this.loadMoreCatches();
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    // Observe the trigger element once it's available
    if (this.loadMoreTrigger) {
      this.intersectionObserver.observe(this.loadMoreTrigger.nativeElement);
    }
  }

  private resetAndLoadCatches(filter: CatchFilter) {
    this.currentFilter = filter;
    this.items = [];
    this.currentOffset = 0;
    this.hasMoreData = true;
    this.totalCount = 0;
    this.loadCatches();
  }

  private loadCatches() {
    this.loading = true;
    this.svc.getCatches(this.currentFilter, this.pageSize, this.currentOffset).subscribe({
      next: (data) => {
        this.items = data;
        this.hasMoreData = data.length === this.pageSize;
        this.currentOffset = data.length;
        this.totalCount = data.length;
        this.countChange.emit(this.totalCount);
        this.loading = false;
        
        // Re-attach observer after view updates
        setTimeout(() => {
          if (this.loadMoreTrigger && this.intersectionObserver) {
            this.intersectionObserver.observe(this.loadMoreTrigger.nativeElement);
          }
        });
        
        // Check if there's a catchId in URL after data loads
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

  private loadMoreCatches() {
    if (this.loadingMore || !this.hasMoreData) {
      return;
    }

    this.loadingMore = true;
    this.svc.getCatches(this.currentFilter, this.pageSize, this.currentOffset).subscribe({
      next: (data) => {
        this.items = [...this.items, ...data];
        this.hasMoreData = data.length === this.pageSize;
        this.currentOffset += data.length;
        this.totalCount = this.items.length;
        this.countChange.emit(this.totalCount);
        this.loadingMore = false;
      },
      error: (err) => {
        console.error('Error loading more catches:', err);
        this.loadingMore = false;
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

