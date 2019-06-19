import { TestBed } from '@angular/core/testing';

import { CbumresolverService } from './cbumresolver.service';

describe('CbumresolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CbumresolverService = TestBed.get(CbumresolverService);
    expect(service).toBeTruthy();
  });
});
