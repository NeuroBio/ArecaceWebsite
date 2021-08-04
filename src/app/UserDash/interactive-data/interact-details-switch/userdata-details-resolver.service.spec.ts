import { TestBed } from '@angular/core/testing';

import { UserdataDetailsResolverService } from './userdata-details-resolver.service';

describe('UserdataDetailsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserdataDetailsResolverService = TestBed.get(UserdataDetailsResolverService);
    expect(service).toBeTruthy();
  });
});
