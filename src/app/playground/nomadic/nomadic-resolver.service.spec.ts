import { TestBed } from '@angular/core/testing';

import { NomadicResolverService } from './nomadic-resolver.service';

describe('NomadicResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NomadicResolverService = TestBed.inject(NomadicResolverService);
    expect(service).toBeTruthy();
  });
});
