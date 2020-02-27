import { Injectable } from '@angular/core';
import { SurveyService } from '../../playground/surveys/survey-components/survey.service';
import { AuthService } from 'src/app/administration/security/Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  constructor(private surveyserv: SurveyService) { }

  viewData(results){
    this.surveyserv.assignSurveyResults(results);
  }
}
