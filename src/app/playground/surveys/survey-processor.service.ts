import { Injectable } from '@angular/core';
import { SurveyData, SurveyOutcome } from './surveyclasses';

@Injectable({
  providedIn: 'root'
})
export class SurveyProcessorService {

  constructor() { }

  standard(finalScores: Object, surveyData: SurveyData, answers: any[], keys: string[]) {
    let finalOutcome = keys[0];
    keys.forEach(key => {
      if(finalScores[finalOutcome] < finalScores[key]){
        finalOutcome = key;
      }
    })

    const Outcome: SurveyOutcome = surveyData.Outcomes.find(o => o.Name === finalOutcome);
    const Match = Math.trunc(finalScores[finalOutcome]*1000)/10;
    return({Outcome, Match});
  }

  Guild(finalScores: Object, surveyData: SurveyData, answers: any[], keys: string[]) {
    return this.standard(finalScores, surveyData, answers, keys);
  }
}
