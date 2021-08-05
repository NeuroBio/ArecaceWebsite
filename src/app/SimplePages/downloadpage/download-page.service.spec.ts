import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

import { DownloadPageService } from './download-page.service';

describe('DownloadPageService', () => {
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
    const service: DownloadPageService = TestBed.inject(DownloadPageService);
    expect(service).toBeTruthy();
  });
});
