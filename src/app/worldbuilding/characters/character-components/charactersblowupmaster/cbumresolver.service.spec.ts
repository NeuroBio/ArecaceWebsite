import { TestBed } from '@angular/core/testing';

import { CBUMResolverService } from './cbumresolver.service';

describe('CBUMResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CBUMResolverService = TestBed.inject(CBUMResolverService);
    expect(service).toBeTruthy();
  });
});
