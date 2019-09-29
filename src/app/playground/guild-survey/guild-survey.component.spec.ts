import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildSurveyComponent } from './guild-survey.component';

describe('GuildSurveyComponent', () => {
  let component: GuildSurveyComponent;
  let fixture: ComponentFixture<GuildSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
