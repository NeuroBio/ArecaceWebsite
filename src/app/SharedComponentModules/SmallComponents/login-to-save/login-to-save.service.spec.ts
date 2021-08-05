import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';

import { LoginToSaveService } from './login-to-save.service';

describe('LoginToSaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AngularFireStorage
    ]
  }));

  it('should be created', () => {
    const service: LoginToSaveService = TestBed.inject(LoginToSaveService);
    expect(service).toBeTruthy();
  });
});
