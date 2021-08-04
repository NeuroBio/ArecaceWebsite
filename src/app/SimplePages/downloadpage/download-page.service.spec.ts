import { TestBed } from '@angular/core/testing';

import { DownloadPageService } from './download-page.service';

describe('DownloadPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DownloadPageService = TestBed.get(DownloadPageService);
    expect(service).toBeTruthy();
  });
});
