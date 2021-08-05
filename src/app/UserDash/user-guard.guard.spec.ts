import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import { UserGuardGuard } from './user-guard.guard';

describe('UserGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [
        UserGuardGuard,
        AngularFireAuth
      ]
    });
  });

  it('should ...', inject([UserGuardGuard], (guard: UserGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
