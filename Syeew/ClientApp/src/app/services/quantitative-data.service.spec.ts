import { TestBed } from '@angular/core/testing';

import { QuantitativeDataService } from './quantitative-data.service';

describe('QuantitativeDataService', () => {
  let service: QuantitativeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuantitativeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
