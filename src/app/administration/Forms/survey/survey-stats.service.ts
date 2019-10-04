import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyStatsService implements OnDestroy{

  surveys = new BehaviorSubject<any>(undefined);
  stream: Subscription;

  constructor(private firebaseserv: FireBaseService) {
    this.stream = this.firebaseserv.returnCollect('Surveys')
    .subscribe(surveys => {
      surveys = surveys.map(survey =>
        survey = {ID: survey.ID,
                  Outcomes: Object.keys(JSON.parse(survey.MaxScores))})
      this.surveys.next(surveys);
    });
   }

   ngOnDestroy() {
     this.stream.unsubscribe();
   }
}
