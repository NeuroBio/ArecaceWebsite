import { Injectable } from '@angular/core';
import { SurveyData, SurveyOutcome } from './surveyclasses';

@Injectable({
  providedIn: 'root'
})
export class SurveyProcessorService {

  constructor() { }

  standard(finalScores: Object, surveyData: SurveyData, keys: string[]) {
    let finalOutcome = keys[0];
    keys.forEach(key => {
      if(finalScores[finalOutcome] < finalScores[key]){
        finalOutcome = key;
      }
    })
    const Outcome: SurveyOutcome = surveyData.Outcomes.find(o => o.Name === finalOutcome);
    const Match = Math.trunc(finalScores[finalOutcome]*1000)/10;
    const Name = surveyData.Name
    return({Outcome: Outcome, Match: Match, Name: Name});
  }

  Guild(finalScores: Object, surveyData: SurveyData, answers: any[], keys: string[]) {
    let Results: any = {}
    
    Results = this.standard(finalScores, surveyData, keys);

    if(answers[0] = 0) {
     Results.Outcome.Text = "You are too young to apply for the Guilds right now.  However, if you were a little bit older, your results would be the following:"
                            +  Results.Outcome.Text
    }
    return Results;
  }
}
