import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexWordFormComponent } from './complex-word-form.component';

describe('ComplexWordFormComponent', () => {
  let component: ComplexWordFormComponent;
  let fixture: ComponentFixture<ComplexWordFormComponent>;

  beforeEach(async(() => {
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
