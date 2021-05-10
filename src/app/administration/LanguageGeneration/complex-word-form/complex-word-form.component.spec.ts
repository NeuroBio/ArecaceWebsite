import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComplexWordFormComponent } from './complex-word-form.component';

describe('ComplexWordFormComponent', () => {
  let component: ComplexWordFormComponent;
  let fixture: ComponentFixture<ComplexWordFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplexWordFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexWordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
