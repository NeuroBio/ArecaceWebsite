import { TestBed } from '@angular/core/testing';

import { FetchSAService } from './fetch-sa.service';

describe('FetchSAService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchSAService = TestBed.get(FetchSAService);
    expect(service).toBeTruthy();
  });
});
