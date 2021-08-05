import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';

import { NewestCueService } from './newest-cue.service';

describe('NewestCueService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AngularFireStorage
    ]
  }));

  it('should be created', () => {
    const service: NewestCueService = TestBed.inject(NewestCueService);
    expect(service).toBeTruthy();
  });
});
