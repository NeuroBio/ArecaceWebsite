import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StoryFormComponent } from './storyform.component';

describe('StoryFormComponent', () => {
  let component:StoryFormComponent;
  let fixture: ComponentFixture<StoryFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
