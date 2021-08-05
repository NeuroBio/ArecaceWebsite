import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';

import { StoryResolver1Service } from './storyresolver1.service';

describe('StoryResolver1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({ 
    providers: [
      AngularFireStorage
    ]
  }));

  it('should be created', () => {
    const service: StoryResolver1Service = TestBed.inject(StoryResolver1Service);
    expect(service).toBeTruthy();
  });
});
