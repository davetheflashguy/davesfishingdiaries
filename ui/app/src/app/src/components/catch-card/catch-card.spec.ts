import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchCard } from './catch-card';

describe('CatchCard', () => {
  let component: CatchCard;
  let fixture: ComponentFixture<CatchCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatchCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatchCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
