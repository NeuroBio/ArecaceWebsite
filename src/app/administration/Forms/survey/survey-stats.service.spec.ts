import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

import { SurveyStatsService } from './survey-stats.service';

describe('SurveyStatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
    ],
    providers: [
      AngularFireAuth,
      AngularFireStorage,
    ]
  }));

  it('should be created', () => {
    const service: SurveyStatsService = TestBed.inject(SurveyStatsService);
    expect(service).toBeTruthy();
  });
});
