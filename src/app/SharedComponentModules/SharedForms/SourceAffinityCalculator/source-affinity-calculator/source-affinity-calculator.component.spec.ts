import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SourceAffinityCalculatorComponent } from './source-affinity-calculator.component';

describe('SourceAffinityCalculatorComponent', () => {
  let component: SourceAffinityCalculatorComponent;
  let fixture: ComponentFixture<SourceAffinityCalculatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceAffinityCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceAffinityCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
