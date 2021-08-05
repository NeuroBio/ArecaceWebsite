import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder } from '@angular/forms';

import { SurveyStatsComponent } from './survey-stats.component';

describe('SurveyStatsComponent', () => {
  let component: SurveyStatsComponent;
  let fixture: ComponentFixture<SurveyStatsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyStatsComponent ],
      providers: [
        FormBuilder,
        AngularFireStorage
      ]
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
