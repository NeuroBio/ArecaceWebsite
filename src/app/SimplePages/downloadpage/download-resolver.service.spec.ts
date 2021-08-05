import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

import { DownloadResolverService } from './download-resolver.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('DownloadResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
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
    const service: DownloadResolverService = TestBed.inject(DownloadResolverService);
    expect(service).toBeTruthy();
  });
});
