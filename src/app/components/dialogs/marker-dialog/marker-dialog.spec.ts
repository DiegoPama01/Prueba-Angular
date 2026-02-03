import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerDialog } from './marker-dialog';

describe('MarkerDialog', () => {
  let component: MarkerDialog;
  let fixture: ComponentFixture<MarkerDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkerDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkerDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
