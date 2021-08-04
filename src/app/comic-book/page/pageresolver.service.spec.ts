import { TestBed } from '@angular/core/testing';

import { PageResolverService } from './pageresolver.service';

describe('PageResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageResolverService = TestBed.inject(PageResolverService);
    expect(service).toBeTruthy();
  });
});
