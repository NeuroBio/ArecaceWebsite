import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScrollFrameComponent } from './scroll-frame.component';

describe('ScrollFrameComponent', () => {
  let component: ScrollFrameComponent;
  let fixture: ComponentFixture<ScrollFrameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
