import { Injectable } from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';

import { SurveyProcessorService } from '../survey-processor.service';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';

import { SurveyData } from 'src/app/Classes/ContentClasses';

@Injectable({
  providedIn: 'root'
})

export class SurveyService {

  surveyData = new BehaviorSubject<SurveyData>(undefined);
  surveyResults = new BehaviorSubject<any>(undefined);
  showSurvey = new BehaviorSubject<boolean>(true);
  allSurveyStats = new BehaviorSubject<any>(undefined);
  currentSurveyStats = new BehaviorSubject<any>(undefined);
  mainStream = new Subscription;
  subStream = new Subscription;

  constructor(private processor: SurveyProcessorService,
              private firebaseserv: FireBaseService) {
    this.mainStream = this.firebaseserv.returnCollectionWithKeys(`SurveyStats`)
      .subscribe(surveyStats => this.allSurveyStats.next(surveyStats));
  }

  assignSurveyData(data: any) {
    this.surveyData.next({
      Questions: JSON.parse(data.Questions),
      Results: JSON.parse(data.Results),
      Outcomes: JSON.parse(data.Outcomes),
      MaxScores: JSON.parse(data.MaxScores),
      ID: data.ID,
      Name: data.Name
    });
    return this.surveyData.value.Questions;
  }

  assignSurveyResults(results: any) {
    return this.surveyResults.next(results);
  }

  assignSurveyStats(ID: string) {
    this.subStream.unsubscribe();
    this.subStream = this.allSurveyStats.subscribe(all => {
      if (all) {
        this.currentSurveyStats.next(all.find(x => x.ID === ID));
      }
    } );
  }

  calculateFinalScores(answers: any[]) {
    this.showSurvey.next(false);

    // Get/Make data structures
    const surveyData = this.surveyData.value;
    const finalScores: any = {};
    surveyData.Outcomes.forEach(o => {
      finalScores[o.Name] = 0;
    });
    const keys = Object.keys(finalScores);

    // Pull out relevant answer results
    answers.forEach((q, i) => {
      const temp = surveyData.Results[i][q.Answer];
      keys.forEach(key => finalScores[key] += +temp[key]);
    });

    // combine results for each key and convert to fraction of maxscore
    keys.forEach(key => {
      if (surveyData.MaxScores[key] !== 0) {
        finalScores[key] = finalScores[key] / surveyData.MaxScores[key];
      } else {
        finalScores[key] = 0;
      }
    });

    // Processing depending on Form type
    try {
      this.assignSurveyResults(this.processor
        [`${surveyData.ID}`](finalScores, surveyData, answers, keys));
    } catch {
      this.assignSurveyResults(this.processor
        .standard(finalScores, surveyData, keys));
    }

    return this.updateStatistics(this.surveyResults.value.OutcomeKey);
  }

  updateStatistics(match: string) {
    const ID = this.surveyData.value.ID;
    this.assignSurveyStats(ID);

    const surveyStats = Object.assign({}, this.currentSurveyStats.value);
    const key = surveyStats.key;
    delete surveyStats.key;
    surveyStats[match] += 1;
    return this.firebaseserv.editDocument(surveyStats, `SurveyStats`, key);
  }

  subDisposal() {
    this.subStream.unsubscribe();
  }

  mainDisposal() {
    this.mainStream.unsubscribe();
  }

}
