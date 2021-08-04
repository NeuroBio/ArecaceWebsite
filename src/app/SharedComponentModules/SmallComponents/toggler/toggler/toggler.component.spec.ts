import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TogglerComponent } from './toggler.component';

describe('TogglerComponent', () => {
  let component: TogglerComponent;
  let fixture: ComponentFixture<TogglerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TogglerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
