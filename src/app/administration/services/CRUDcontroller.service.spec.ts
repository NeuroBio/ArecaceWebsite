import { TestBed } from '@angular/core/testing';

import { CRUDcontrollerService } from './CRUDcontroller.service';

describe('CRUDcontrollerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CRUDcontrollerService = TestBed.inject(CRUDcontrollerService);
    expect(service).toBeTruthy();
  });
});
