import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

import { FireBaseService } from './firebase.service';

describe('FireBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
    ],
    providers: [
      AngularFireAuth,
      AngularFirestore,
      AngularFireStorage
    ]
  }));

  it('should be created', () => {
    const service: FireBaseService = TestBed.inject(FireBaseService);
    expect(service).toBeTruthy();
  });
});
