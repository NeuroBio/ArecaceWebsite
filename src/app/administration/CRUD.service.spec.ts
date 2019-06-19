import { TestBed } from '@angular/core/testing';

import { CRUD } from './CRUD.service';

describe('CRUD', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CRUD = TestBed.get(CRUD);
    expect(service).toBeTruthy();
  });
});
