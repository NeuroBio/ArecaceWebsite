import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFeedComponent } from './updatefeed.component';

describe('UpdateFeedComponent', () => {
  let component: UpdateFeedComponent;
  let fixture: ComponentFixture<UpdateFeedComponent>;

  beforeEach(async(() => {
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
