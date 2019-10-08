import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceCalcFrameComponent } from './source-calc-frame.component';

describe('SourceCalcFrameComponent', () => {
  let component: SourceCalcFrameComponent;
  let fixture: ComponentFixture<SourceCalcFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceCalcFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceCalcFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
