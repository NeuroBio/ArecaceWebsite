import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChapterFormComponent } from './chapterform.component';

describe('ChapterFormComponent', () => {
  let component: ChapterFormComponent;
  let fixture: ComponentFixture<ChapterFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
