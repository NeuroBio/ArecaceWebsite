import { TestBed } from '@angular/core/testing';

import { GeneralcollectionService } from './generalcollection.service';

describe('GeneralcollectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralcollectionService = TestBed.get(GeneralcollectionService);
    expect(service).toBeTruthy();
  });
});
