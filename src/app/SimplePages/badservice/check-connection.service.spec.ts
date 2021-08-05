import { TestBed } from '@angular/core/testing';

import { CheckConnectionService } from './check-connection.service';

describe('BadConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckConnectionService = TestBed.inject(CheckConnectionService);
    expect(service).toBeTruthy();
  });
});
