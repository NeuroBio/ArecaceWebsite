import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';

import { DownloadResolverService } from './download-resolver.service';

describe('DownloadResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AngularFireStorage
    ]
  }));

  it('should be created', () => {
    const service: DownloadResolverService = TestBed.inject(DownloadResolverService);
    expect(service).toBeTruthy();
  });
});
