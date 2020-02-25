import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersArtComponent } from './others-art.component';

describe('OthersArtComponent', () => {
  let component: OthersArtComponent;
  let fixture: ComponentFixture<OthersArtComponent>;

  beforeEach(async(() => {
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
