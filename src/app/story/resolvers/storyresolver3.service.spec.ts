import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoryResolver3Service } from './storyresolver3.service';

describe('StoryResolver3Service', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
    ]
  }));

  it('should be created', () => {
    const service: StoryResolver3Service = TestBed.inject(StoryResolver3Service);
    expect(service).toBeTruthy();
  });
});
