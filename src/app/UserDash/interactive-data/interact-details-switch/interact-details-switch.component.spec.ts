import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {InteractDetailsSwitchComponent } from './interact-details-switch.component';

describe('InteractDetailsSwitchComponent', () => {
  let component: InteractDetailsSwitchComponent;
  let fixture: ComponentFixture<InteractDetailsSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractDetailsSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractDetailsSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
