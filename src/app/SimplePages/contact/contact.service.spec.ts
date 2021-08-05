import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';

import { ContactService } from './contact.service';

describe('ContactService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AngularFireStorage
    ]
  }));

  it('should be created', () => {
    const service: ContactService = TestBed.inject(ContactService);
    expect(service).toBeTruthy();
  });
});
