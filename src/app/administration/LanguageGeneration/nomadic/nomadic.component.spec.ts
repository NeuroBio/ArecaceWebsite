import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NomadicComponent } from './nomadic.component';

describe('NomadicComponent', () => {
  let component: NomadicComponent;
  let fixture: ComponentFixture<NomadicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NomadicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NomadicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
