import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SurveyPartsComponent } from './survey-parts.component';

describe('SurveyPartsComponent', () => {
  let component: SurveyPartsComponent;
  let fixture: ComponentFixture<SurveyPartsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
