import { TestBed } from '@angular/core/testing';

import { DisplayService } from './display.service';

describe('DisplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisplayService = TestBed.inject(DisplayService);
    expect(service).toBeTruthy();
  });
});
