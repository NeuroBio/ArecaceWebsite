import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CBUMResolverService } from './cbumresolver.service';

describe('CBUMResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: CBUMResolverService = TestBed.inject(CBUMResolverService);
    expect(service).toBeTruthy();
  });
});
