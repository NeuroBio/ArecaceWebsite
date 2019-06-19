import { TestBed } from '@angular/core/testing';

import { StoryResolver1Service } from './storyresolver1.service';

describe('StoryResolver1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoryResolver1Service = TestBed.get(StoryResolver1Service);
    expect(service).toBeTruthy();
  });
});
