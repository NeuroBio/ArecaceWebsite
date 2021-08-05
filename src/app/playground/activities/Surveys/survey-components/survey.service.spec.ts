import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';

import { SurveyService } from './survey.service';

describe('SurveyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AngularFireStorage
    ]
  }));

  it('should be created', () => {
    const service: SurveyService = TestBed.inject(SurveyService);
    expect(service).toBeTruthy();
  });
});
