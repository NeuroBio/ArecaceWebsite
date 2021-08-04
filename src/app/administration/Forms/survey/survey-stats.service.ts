import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyStatsService {

  surveys = new BehaviorSubject<any>(undefined);
  stream: Subscription;

  constructor(private firebaseserv: FireBaseService) {
    this.stream = this.firebaseserv.returnCollect('Surveys')
    .subscribe(surveys => {
      surveys = surveys.map(survey =>
        survey = {ID: survey.ID,
                  Outcomes: Object.keys(JSON.parse(survey.MaxScores))});
      this.surveys.next(surveys);
    });
   }
}
