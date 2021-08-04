import { TestBed } from '@angular/core/testing';

import { ImageResizerService } from './image-resizer.service';

describe('ImageResizerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageResizerService = TestBed.inject(ImageResizerService);
    expect(service).toBeTruthy();
  });
});
