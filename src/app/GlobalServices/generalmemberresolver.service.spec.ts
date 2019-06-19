import { TestBed } from '@angular/core/testing';

import { GeneralmemberresolverService } from './generalmemberresolver.service';

describe('GeneralmemberresolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralmemberresolverService = TestBed.get(GeneralmemberresolverService);
    expect(service).toBeTruthy();
  });
});
