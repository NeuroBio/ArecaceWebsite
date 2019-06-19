import { TestBed } from '@angular/core/testing';

import { BookResolverService } from './bookresolver.service';

describe('BookResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookResolverService = TestBed.get(BookResolverService);
    expect(service).toBeTruthy();
  });
});
