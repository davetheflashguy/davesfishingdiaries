import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchHighlight } from './catch-highlight';

describe('CatchHighlight', () => {
  let component: CatchHighlight;
  let fixture: ComponentFixture<CatchHighlight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatchHighlight]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatchHighlight);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
