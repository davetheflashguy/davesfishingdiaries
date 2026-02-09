import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchList } from './catch-list';

describe('CatchList', () => {
  let component: CatchList;
  let fixture: ComponentFixture<CatchList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatchList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatchList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
