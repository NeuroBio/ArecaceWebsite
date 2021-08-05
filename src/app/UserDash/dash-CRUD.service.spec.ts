import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';

import { DashCRUDService } from './dash-CRUD.service';

describe('DashCRUDService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AngularFireStorage
    ]
  }));

  it('should be created', () => {
    const service: DashCRUDService = TestBed.inject(DashCRUDService);
    expect(service).toBeTruthy();
  });
});
