import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GeneralmemberresolverService } from './generalmemberresolver.service';

describe('GeneralmemberresolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: GeneralmemberresolverService = TestBed.inject(GeneralmemberresolverService);
    expect(service).toBeTruthy();
  });
});
