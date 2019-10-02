import { Injectable, OnInit } from '@angular/core';
import { GeneralcollectionService } from 'src/app/GlobalServices/generalcollection.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  Results = new BehaviorSubject<any>(undefined)

  constructor(private collectionserv: GeneralcollectionService) { }

  calculateFinalScores(answers, outcomes, results, maxScores) {
    let finalScores: object = {}; 
    outcomes.forEach(o => {
      finalScores[o.Name] = 0;
    });
    let keys = Object.keys(finalScores);

    answers.forEach((q,i) =>{
      let temp = results[i][q.Answer]
      keys.forEach(key => finalScores[key] += +temp[key]);
    });

    keys.forEach(key => {
      if(maxScores[key] !== 0){
        finalScores[key] = finalScores[key]/maxScores[key];
      } else {
        finalScores[key] = 0;
      }
    });
  }
}
