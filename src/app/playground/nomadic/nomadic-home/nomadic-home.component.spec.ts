import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NomadicHomeComponent } from './nomadic-home.component';

describe('NomadicHomeComponent', () => {
  let component: NomadicHomeComponent;
  let fixture: ComponentFixture<NomadicHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NomadicHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NomadicHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
