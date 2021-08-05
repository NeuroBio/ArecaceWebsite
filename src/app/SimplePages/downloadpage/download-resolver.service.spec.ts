import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

import { DownloadResolverService } from './download-resolver.service';

describe('DownloadResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
    ],
    providers: [
      AngularFireAuth,
      AngularFireStorage
    ]
  }));

  it('should be created', () => {
    const service: DownloadResolverService = TestBed.inject(DownloadResolverService);
    expect(service).toBeTruthy();
  });
});
