import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateFeedComponent } from './updatefeed.component';

describe('UpdateFeedComponent', () => {
  let component: UpdateFeedComponent;
  let fixture: ComponentFixture<UpdateFeedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
