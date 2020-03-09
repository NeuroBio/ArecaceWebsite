import { TestBed } from '@angular/core/testing';

import { UserdataMainResolverService } from './userdata-main-resolver.service';

describe('UserdataMainResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserdataMainResolverService = TestBed.get(UserdataMainResolverService);
    expect(service).toBeTruthy();
  });
});
