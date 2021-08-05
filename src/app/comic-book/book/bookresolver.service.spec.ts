import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BookResolverService } from './bookresolver.service';

describe('BookResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: BookResolverService = TestBed.inject(BookResolverService);
    expect(service).toBeTruthy();
  });
});
