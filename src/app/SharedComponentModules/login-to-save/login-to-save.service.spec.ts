import { TestBed } from '@angular/core/testing';

import { LoginToSaveService } from './login-to-save.service';

describe('LoginToSaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginToSaveService = TestBed.get(LoginToSaveService);
    expect(service).toBeTruthy();
  });
});
