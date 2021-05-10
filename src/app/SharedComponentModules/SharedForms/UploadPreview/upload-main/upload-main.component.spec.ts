import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UploadMainComponent } from './upload-main.component';

describe('UploadMainComponent', () => {
  let component: UploadMainComponent;
  let fixture: ComponentFixture<UploadMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
