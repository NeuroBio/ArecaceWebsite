import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyStatsComponent } from './survey-stats.component';

describe('SurveyStatsComponent', () => {
  let component: SurveyStatsComponent;
  let fixture: ComponentFixture<SurveyStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
