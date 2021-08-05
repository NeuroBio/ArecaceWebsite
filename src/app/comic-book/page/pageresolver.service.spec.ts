import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PageResolverService } from './pageresolver.service';

describe('PageResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: PageResolverService = TestBed.inject(PageResolverService);
    expect(service).toBeTruthy();
  });
});
