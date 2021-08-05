import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';

import { GeneralcollectionService } from './generalcollection.service';

describe('GeneralcollectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AngularFireStorage
    ]
  }));

  it('should be created', () => {
    const service: GeneralcollectionService = TestBed.inject(GeneralcollectionService);
    expect(service).toBeTruthy();
  });
});
