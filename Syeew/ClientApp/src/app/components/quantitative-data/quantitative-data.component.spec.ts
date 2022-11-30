import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitativeDataComponent } from './quantitative-data.component';

describe('QuantitativeDataComponent', () => {
  let component: QuantitativeDataComponent;
  let fixture: ComponentFixture<QuantitativeDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantitativeDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantitativeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
