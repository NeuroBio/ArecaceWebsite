import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

import { LoginToSaveService } from './login-to-save.service';

describe('LoginToSaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
      AngularFireModule.initializeApp(environment.firebase),
    ],
    providers: [
      AngularFireAuth,
      AngularFireStorage,
      AngularFirestore
    ]
  }));

  it('should be created', () => {
    const service: LoginToSaveService = TestBed.inject(LoginToSaveService);
    expect(service).toBeTruthy();
  });
});
