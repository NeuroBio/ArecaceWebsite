import { Injectable } from '@angular/core';
import { SurveyData, SurveyOutcome } from 'src/app/Classes/ContentClasses';

@Injectable({
  providedIn: 'root'
})
export class SurveyProcessorService {

  constructor() { }

  standard(finalScores: any, surveyData: SurveyData, keys: string[]) {
    
    //MAIN RESULT
    
    let finalOutcome = keys[0];
    keys.forEach(key => {
      if(finalScores[finalOutcome] < finalScores[key]){
        finalOutcome = key;
      }
    })
    const Outcome: SurveyOutcome = surveyData.Outcomes
      .find(o => o.Name === finalOutcome);
    const Match = Math.trunc(finalScores[finalOutcome]*1000)/10;
    const Name = surveyData.Name

    //ALL SCORES
    let allScores: any[] = [];
    keys.forEach(key => {
      let score = Math.trunc(finalScores[key]*1000)/10;
      let text = surveyData.Outcomes.find(x => x.Name === key).Text;
      allScores.push({Score: score, Text: text, Name: key});
    })

    allScores.sort((a,b) => a.Score > b.Score ? -1 : 1);

    return({Outcome: Outcome, Match: Match, Name: Name,
            AllScores: allScores, OutcomeKey: finalOutcome});
  }

  Guild(finalScores: any, surveyData: SurveyData, answers: any[], keys: string[]) {
    let Results: any = {}
    let assassin = '';
    let age = ''; 
    let esarian = '';
    const maxAssassin: number = surveyData.MaxScores.Assassin;
    let assassinMatch = Math.trunc((finalScores.Assassin * maxAssassin/(maxAssassin-2))*1000)/100;
    let bestMatch = '';

    //Assassin check
    if(assassinMatch >= 50){
      assassin = surveyData.Outcomes.find(a => a.Name === 'Assassin').Text;
      if(assassinMatch > 100){
        assassinMatch = 100;
      }
    } else {
      assassin = surveyData.Outcomes.find(a => a.Name === 'nonAssassin').Text;
    }

    keys.splice(keys.findIndex(x => x === "Assassin"), 1)
    keys.splice(keys.findIndex(x => x === "nonAssassin"), 1)
    keys.splice(keys.findIndex(x => x === "NoGuild"), 1)

    Results = this.standard(finalScores, surveyData, keys);

    // Additional checks for age and Esarian status
    if(answers[0].Answer === 0) {
      age = "You are too young to apply for the Guilds right now.  However, if you were a little bit older, your results would be the following: \n\n"
    }

    if(answers[23].Answer === 0 &&  (['DIA', 'AnK'].indexOf(Results.Outcome.Name) === -1)){
      esarian = "Unfortunately, your best match was with a Guild that doesn't accept Esarian members.  If you were not Esarian, you would have received the following result: \n\n"
    }

    if(Results.Match < 40) {
      bestMatch = `Your best match was with ${Results.Outcome.Name} Guild.`
      Results.Outcome = surveyData.Outcomes.find(a => a.Name === 'NoGuild');
      esarian = '';
      Results.OutcomeKey = "NoGuild"
    }

    Results.Outcome.Text = `${age}${esarian}${Results.Outcome.Text} ${bestMatch}\n\n${assassin} (${assassinMatch}% match)`
    Results.Limit = 40;

    return Results;
  }
}
