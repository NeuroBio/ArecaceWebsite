import { TestBed } from '@angular/core/testing';

import { GeneralcollectionresolverService } from './generalcollectionresolver.service';

describe('GeneralcollectionresolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralcollectionresolverService = TestBed.get(GeneralcollectionresolverService);
    expect(service).toBeTruthy();
  });
});
