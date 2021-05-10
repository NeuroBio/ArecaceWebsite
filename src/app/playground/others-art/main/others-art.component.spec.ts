import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OthersArtComponent } from './others-art.component';

describe('OthersArtComponent', () => {
  let component: OthersArtComponent;
  let fixture: ComponentFixture<OthersArtComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersArtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
