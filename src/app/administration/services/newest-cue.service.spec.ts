import { TestBed } from '@angular/core/testing';

import { NewestCueService } from './newest-cue.service';

describe('NewestCueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewestCueService = TestBed.get(NewestCueService);
    expect(service).toBeTruthy();
  });
});
