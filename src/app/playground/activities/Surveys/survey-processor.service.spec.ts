import { TestBed } from '@angular/core/testing';

import { SurveyProcessorService } from './survey-processor.service';

describe('SurveyProcessorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurveyProcessorService = TestBed.inject(SurveyProcessorService);
    expect(service).toBeTruthy();
  });
});
