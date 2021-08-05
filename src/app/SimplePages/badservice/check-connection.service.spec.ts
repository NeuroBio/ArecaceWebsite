import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';

import { CheckConnectionService } from './check-connection.service';

describe('CheckConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AngularFireStorage
    ]
  }));

  it('should be created', () => {
    const service: CheckConnectionService = TestBed.inject(CheckConnectionService);
    expect(service).toBeTruthy();
  });
});
