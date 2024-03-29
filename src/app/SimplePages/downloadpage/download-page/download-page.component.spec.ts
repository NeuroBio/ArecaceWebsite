import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DownloadPageComponent } from './download-page.component';

describe('DownloadPageComponent', () => {
  let component: DownloadPageComponent;
  let fixture: ComponentFixture<DownloadPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
