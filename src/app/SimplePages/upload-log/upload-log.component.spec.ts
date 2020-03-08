import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadLogComponent } from './upload-log.component';

describe('UploadLogComponent', () => {
  let component: UploadLogComponent;
  let fixture: ComponentFixture<UploadLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
