import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitieshomeComponent } from './activitieshome.component';

describe('ActivitieshomeComponent', () => {
  let component: ActivitieshomeComponent;
  let fixture: ComponentFixture<ActivitieshomeComponent>;

  beforeEach(async(() => {
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
