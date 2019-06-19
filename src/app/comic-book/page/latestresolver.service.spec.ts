import { TestBed } from '@angular/core/testing';

import { LatestResolverService } from './latestresolver.service';

describe('LatestResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LatestResolverService = TestBed.get(LatestResolverService);
    expect(service).toBeTruthy();
  });
});
