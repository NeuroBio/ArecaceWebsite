import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StoryResolver2Service } from './storyresolver2.service';

describe('StoryResolver2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: StoryResolver2Service = TestBed.inject(StoryResolver2Service);
    expect(service).toBeTruthy();
  });
});
