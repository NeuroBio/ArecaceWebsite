import { TestBed } from '@angular/core/testing';

import { GetRouteSegmentsService } from './commonfunctions.service';

describe('GetRouteSegmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetRouteSegmentsService = TestBed.get(GetRouteSegmentsService);
    expect(service).toBeTruthy();
  });
});
