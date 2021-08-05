import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

import { CacheService } from './cache.service';

describe('CacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
    ],
    providers: [
      AngularFireAuth,
      AngularFireStorage,
      AngularFirestore
    ]
  }));

  it('should be created', () => {
    const service: CacheService = TestBed.inject(CacheService);
    expect(service).toBeTruthy();
  });
});
