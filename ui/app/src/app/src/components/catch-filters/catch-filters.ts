import { ChangeDetectionStrategy, Component, signal} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

interface Species {
  label: string;
}

interface Year {
  label: string;
}

interface WaterBody {
  label: string;
}

@Component({
  selector: 'app-catch-filters',
  imports: [MatExpansionModule, ReactiveFormsModule, MatIconModule, MatLabel, MatFormField, MatInputModule, MatSelectModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './catch-filters.html',
  styleUrl: './catch-filters.scss',
})
export class CatchFilters {
  readonly panelOpenState = signal(false);
  filterForm: any;
  speciesList: Species[] = [];
  yearList: Year[] = [];
  waterBodyList: WaterBody[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.speciesList =  [
      { label: 'Trout' },
      { label: 'Bass' },
      { label: 'Pike' },
      { label: 'Catfish' },
      { label: 'Carp' },
    ];
    this.yearList = [
      { label: '2020' },
      { label: '2021' },
      { label: '2022' },
      { label: '2023' },
      { label: '2024' },
      { label: '2025' },  
    ];
    this.waterBodyList = [
      { label: 'Best Lake' },
      { label: 'Lake Parsippany' },
      { label: 'Little Falls Township' },
      { label: 'South Mountain Fairy Trail' },
    ];
    
    // Define the form model
    this.filterForm = this.fb.group({
      species: ['',],
      year: ['',],
      waterBody: ['',],
      conditions: ['',],
    });
  }

  onSubmit() {  
    console.log('Form Submitted!', this.filterForm.value);
  }

}
