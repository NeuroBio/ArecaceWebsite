import { TestBed } from '@angular/core/testing';

import { UploadPreviewService } from './upload-preview.service';

describe('UploadPreviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadPreviewService = TestBed.inject(UploadPreviewService);
    expect(service).toBeTruthy();
  });
});
