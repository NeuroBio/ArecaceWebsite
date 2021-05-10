import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UploadPreviewComponent } from './upload-preview.component';

describe('UploadPreviewComponent', () => {
  let component: UploadPreviewComponent;
  let fixture: ComponentFixture<UploadPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
