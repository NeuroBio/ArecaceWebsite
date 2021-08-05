import { TestBed } from '@angular/core/testing';

import { BirthdayService } from './birthday.service';

describe('BirthdayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BirthdayService = TestBed.inject(BirthdayService);
    expect(service).toBeTruthy();
  });
});
