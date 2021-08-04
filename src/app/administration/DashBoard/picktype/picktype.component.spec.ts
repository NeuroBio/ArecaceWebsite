import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PickTypeComponent } from './picktype.component';

describe('PickUploadComponent', () => {
  let component: PickTypeComponent;
  let fixture: ComponentFixture<PickTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PickTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
