import { TestBed } from '@angular/core/testing';

import { StoryResolver2Service } from './storyresolver2.service';

describe('StoryResolver2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoryResolver2Service = TestBed.get(StoryResolver2Service);
    expect(service).toBeTruthy();
  });
});
