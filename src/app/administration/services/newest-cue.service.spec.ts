import { TestBed } from '@angular/core/testing';

import { NewestCueService } from './newest-cue.service';

describe('NewestCueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewestCueService = TestBed.inject(NewestCueService);
    expect(service).toBeTruthy();
  });
});
