import { TestBed } from '@angular/core/testing';

import { StoryResolver3Service } from './storyresolver3.service';

describe('StoryResolver3Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoryResolver3Service = TestBed.get(StoryResolver3Service);
    expect(service).toBeTruthy();
  });
});
