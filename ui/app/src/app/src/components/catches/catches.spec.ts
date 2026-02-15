import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Catches } from './catches';

describe('Catches', () => {
  let component: Catches;
  let fixture: ComponentFixture<Catches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Catches]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Catches);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
