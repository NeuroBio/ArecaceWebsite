import { TestBed } from '@angular/core/testing';

import { NomadicService } from './nomadic.service';

describe('NomadicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NomadicService = TestBed.inject(NomadicService);
    expect(service).toBeTruthy();
  });
});
