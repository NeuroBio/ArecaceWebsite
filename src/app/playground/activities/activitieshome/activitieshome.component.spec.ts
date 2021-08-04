import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActivitieshomeComponent } from './activitieshome.component';

describe('ActivitieshomeComponent', () => {
  let component: ActivitieshomeComponent;
  let fixture: ComponentFixture<ActivitieshomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitieshomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitieshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
