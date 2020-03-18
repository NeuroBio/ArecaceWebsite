import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPartsComponent } from './survey-parts.component';

describe('SurveyPartsComponent', () => {
  let component: SurveyPartsComponent;
  let fixture: ComponentFixture<SurveyPartsComponent>;

  beforeEach(async(() => {
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
