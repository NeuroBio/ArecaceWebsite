import { TestBed, inject } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

import { UserGuardGuard } from './user-guard.guard';

describe('UserGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [
        UserGuardGuard,
        AngularFireAuth,
        AngularFireStorage,
        AngularFirestore
      ]
    });
  });

  it('should ...', inject([UserGuardGuard], (guard: UserGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
