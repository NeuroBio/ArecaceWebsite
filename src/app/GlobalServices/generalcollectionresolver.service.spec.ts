import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';

import { GeneralcollectionresolverService } from './generalcollectionresolver.service';

describe('GeneralcollectionresolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AngularFireStorage
    ]
  }));

  it('should be created', () => {
    const service: GeneralcollectionresolverService = TestBed.inject(GeneralcollectionresolverService);
    expect(service).toBeTruthy();
  });
});
