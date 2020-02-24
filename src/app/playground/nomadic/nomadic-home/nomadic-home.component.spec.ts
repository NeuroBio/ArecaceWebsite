import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NomadicHomeComponent } from './nomadic-home.component';

describe('NomadicHomeComponent', () => {
  let component: NomadicHomeComponent;
  let fixture: ComponentFixture<NomadicHomeComponent>;

  beforeEach(async(() => {
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
