import { TestBed } from '@angular/core/testing';

import { RefocusService } from './refocus.service';

describe('RefocusService', () => {
  let service: RefocusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefocusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
