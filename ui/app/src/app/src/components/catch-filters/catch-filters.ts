import { ChangeDetectionStrategy, Component, Output, EventEmitter, Input, signal} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CatchListsService, CatchFilter } from '../catch-list/catch-lists.service';

@Component({
  selector: 'app-catch-filters',
  imports: [MatExpansionModule, ReactiveFormsModule, MatIconModule, MatLabel, MatFormField, MatInputModule, MatSelectModule, MatButtonModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './catch-filters.html',
  styleUrl: './catch-filters.scss',
})
export class CatchFilters {
  @Output() filterChange = new EventEmitter<CatchFilter>();
  @Input() totalCount: number = 0;

  readonly panelOpenState = signal(false);
  filterForm!: FormGroup;
  speciesList = signal<string[]>([]);
  yearList = signal<number[]>([]);
  waterBodyList = signal<string[]>([]);

  constructor(
    private fb: FormBuilder,
    private catchService: CatchListsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // Initialize form
    this.filterForm = this.fb.group({
      species: [''],
      year: [''],
      waterBody: [''],
      conditions: [''],
    });

    // Load filter options from API
    this.catchService.getSpeciesList().subscribe(
      species => this.speciesList.set(species)
    );

    this.catchService.getYears().subscribe(
      years => this.yearList.set(years)
    );

    this.catchService.getWaterBodies().subscribe(
      waterBodies => this.waterBodyList.set(waterBodies)
    );

    // Load filters from URL query params
    this.activatedRoute.queryParams.subscribe(params => {
      this.filterForm.patchValue({
        species: params['species'] || '',
        year: params['year'] || '',
        waterBody: params['waterBody'] || '',
        conditions: params['conditions'] || '',
      }, { emitEvent: false });

      // Apply filters from URL on init
      if (Object.keys(params).length > 0) {
        const filter = this.buildFilterFromParams(params);
        this.filterChange.emit(filter);
      }
    });
  }

  onSubmit() {
    const formValue = this.filterForm.value;
    const filter = this.buildFilterFromForm(formValue);
    
    // Update URL with filter params
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.filterToQueryParams(filter),
      queryParamsHandling: 'merge',
    });

    this.filterChange.emit(filter);
  }

  clearFilters() {
    this.filterForm.reset();
    
    // Clear URL params
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { species: null, year: null, waterBody: null, conditions: null },
      queryParamsHandling: 'merge',
    });

    this.filterChange.emit({});
  }

  private buildFilterFromForm(formValue: any): CatchFilter {
    const filter: CatchFilter = {};

    if (formValue.species) filter.species = formValue.species;
    if (formValue.year) filter.year = parseInt(formValue.year);
    if (formValue.waterBody) filter.water_body = formValue.waterBody;
    if (formValue.conditions) filter.conditions = formValue.conditions;

    return filter;
  }

  private buildFilterFromParams(params: any): CatchFilter {
    const filter: CatchFilter = {};

    if (params['species']) filter.species = params['species'];
    if (params['year']) filter.year = parseInt(params['year']);
    if (params['waterBody']) filter.water_body = params['waterBody'];
    if (params['conditions']) filter.conditions = params['conditions'];

    return filter;
  }

  private filterToQueryParams(filter: CatchFilter): any {
    return {
      species: filter.species || null,
      year: filter.year || null,
      waterBody: filter.water_body || null,
      conditions: filter.conditions || null,
    };
  }
}
