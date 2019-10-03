import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { GeneralcollectionService } from 'src/app/GlobalServices/generalcollection.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Inject } from '@angular/compiler/src/core';
import { SurveyData } from './surveyclasses';
import { SurveyProcessorService } from './survey-processor.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  surveyData = new BehaviorSubject<SurveyData>(undefined);
  surveyResults = new BehaviorSubject<any>(undefined);
  showSurvey = new BehaviorSubject<boolean>(true);

  constructor(private processor: SurveyProcessorService) { }

  assignSurveyData(data: any){
    this.surveyData.next({Questions: JSON.parse(data.Questions),
                          Results: JSON.parse(data.Results),
                          Outcomes: JSON.parse(data.Outcomes),
                          MaxScores: JSON.parse(data.MaxScores),
                          ID: data.ID,
                          Name: data.Name});
    return this.surveyData.value.Questions;
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
      this.surveyResults.next(this.processor
        [`${surveyData.ID}`](finalScores, surveyData, answers, keys));
    }
    catch {
      this.surveyResults.next(this.processor
        .standard(finalScores, surveyData, keys));
    }
  }


}
