import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';

import { UploadLogComponent } from './upload-log.component';

describe('UploadLogComponent', () => {
  let component: UploadLogComponent;
  let fixture: ComponentFixture<UploadLogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadLogComponent ],
      providers: [
        AngularFireAuth,
        AngularFireStorage
      ]
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
