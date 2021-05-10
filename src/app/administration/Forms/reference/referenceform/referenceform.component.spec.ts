import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReferenceFormComponent } from './referenceform.component';

describe('ReferenceFormComponent', () => {
  let component: ReferenceFormComponent;
  let fixture: ComponentFixture<ReferenceFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
