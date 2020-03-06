import { TestBed } from '@angular/core/testing';

import { DashCRUDService } from './dash-CRUD.service';

describe('DashCRUDService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashCRUDService = TestBed.get(DashCRUDService);
    expect(service).toBeTruthy();
  });
});
