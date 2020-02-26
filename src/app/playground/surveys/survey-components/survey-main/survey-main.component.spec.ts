import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMainComponent } from './survey-main.component';

describe('SurveyMainComponent', () => {
  let component: SurveyMainComponent;
  let fixture: ComponentFixture<SurveyMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
