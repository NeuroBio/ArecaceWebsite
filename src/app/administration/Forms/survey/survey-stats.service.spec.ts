import { TestBed } from '@angular/core/testing';

import { SurveyStatsService } from './survey-stats.service';

describe('SurveyStatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurveyStatsService = TestBed.inject(SurveyStatsService);
    expect(service).toBeTruthy();
  });
});
