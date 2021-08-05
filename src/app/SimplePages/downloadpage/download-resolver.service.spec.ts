import { TestBed } from '@angular/core/testing';

import { DownloadResolverService } from './download-resolver.service';

describe('DownloadResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DownloadResolverService = TestBed.inject(DownloadResolverService);
    expect(service).toBeTruthy();
  });
});
