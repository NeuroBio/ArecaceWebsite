import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BlowUpComponent } from './blowup.component';

describe('BlowUpComponent', () => {
  let component: BlowUpComponent;
  let fixture: ComponentFixture<BlowUpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BlowUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
