import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SurveyData } from '../../../Classes/ContentClasses';
import { SurveyProcessorService } from '../survey-processor.service';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService implements OnDestroy {

  surveyData = new BehaviorSubject<SurveyData>(undefined);
  surveyResults = new BehaviorSubject<any>(undefined);
  showSurvey = new BehaviorSubject<boolean>(true);
  allSurveyStats = new BehaviorSubject<any>(undefined);
  currentSurveyStats = new BehaviorSubject<any>(undefined);
  stream1: Subscription;

  constructor(private processor: SurveyProcessorService,
              private firebaseserv: FireBaseService) {
    this.stream1 = this.firebaseserv.returnCollectionWithKeys(`SurveyStats`)
      .subscribe(surveyStats => this.allSurveyStats.next(surveyStats));
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
  }

  assignSurveyData(data: any){
    this.surveyData.next({Questions: JSON.parse(data.Questions),
                          Results: JSON.parse(data.Results),
                          Outcomes: JSON.parse(data.Outcomes),
                          MaxScores: JSON.parse(data.MaxScores),
                          ID: data.ID,
                          Name: data.Name});
    return this.surveyData.value.Questions;
  }

  assignSurveyResults(results: any) {
    this.surveyResults.next(results);
  }
  
  calculateFinalScores(answers: any[]) {
    this.showSurvey.next(false);
    
    // Get/Make data structures
    const surveyData = this.surveyData.value
    let finalScores: any = {}; 
    surveyData.Outcomes.forEach(o => {
      finalScores[o.Name] = 0;
    });
    let keys = Object.keys(finalScores);

    // Pull out relevant answer results
    answers.forEach((q,i) =>{
      let temp = surveyData.Results[i][q.Answer]
      keys.forEach(key => finalScores[key] += +temp[key]);
    });

    //combine results for each key and convert to fraction of maxscore
    keys.forEach(key => {
      if(surveyData.MaxScores[key] !== 0){
        finalScores[key] = finalScores[key]/surveyData.MaxScores[key];
      } else {
        finalScores[key] = 0;
      }
    });
    
    //Processing depending on Form type
    try {
      this.assignSurveyResults(this.processor
        [`${surveyData.ID}`](finalScores, surveyData, answers, keys));
    }
    catch {
      this.assignSurveyResults(this.processor
        .standard(finalScores, surveyData, keys));
    }

    return this.updateStatistics(this.surveyResults.value.OutcomeKey);
  }

  
  updateStatistics(match: string) {
    const ID = this.surveyData.value.ID;
    let surveyStats = Object.assign({}, this.allSurveyStats.value.find(x => x.ID === ID));
    const key = surveyStats.key;
    delete surveyStats.key;
    surveyStats[match] += 1;
    this.currentSurveyStats.next(surveyStats);
    return this.firebaseserv.editDocument(surveyStats, `SurveyStats`, key);
  }

}
