import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';

import { BirthdayService } from './birthday.service';

describe('BirthdayService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AngularFireStorage
    ]
  }));

  it('should be created', () => {
    const service: BirthdayService = TestBed.inject(BirthdayService);
    expect(service).toBeTruthy();
  });
});
