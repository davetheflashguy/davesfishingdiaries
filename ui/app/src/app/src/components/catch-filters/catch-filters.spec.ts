import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchFilters } from './catch-filters';

describe('CatchFilters', () => {
  let component: CatchFilters;
  let fixture: ComponentFixture<CatchFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatchFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatchFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
