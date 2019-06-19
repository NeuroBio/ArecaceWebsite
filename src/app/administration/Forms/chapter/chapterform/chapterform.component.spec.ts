import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterFormComponent } from './chapterform.component';

describe('ChapterFormComponent', () => {
  let component: ChapterFormComponent;
  let fixture: ComponentFixture<ChapterFormComponent>;

  beforeEach(async(() => {
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
