import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickUpComponent } from './pick-up.component';

describe('PickUpComponent', () => {
  let component: PickUpComponent;
  let fixture: ComponentFixture<PickUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
