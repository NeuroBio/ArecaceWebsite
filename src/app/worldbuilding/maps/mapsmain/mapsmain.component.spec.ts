import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MapsMainComponent } from './mapsmain.component';

describe('MapsmainComponent', () => {
  let component: MapsMainComponent;
  let fixture: ComponentFixture<MapsMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
