import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../administration/security/Auth/auth.service';
import { GeneralcollectionService } from '../../GlobalServices/generalcollection.service';
import { take, tap } from 'rxjs/operators';
import { SurveyService } from '../../playground/surveys/survey-components/survey.service';

@Injectable({
  providedIn: 'root'
})
export class AuthResolverService implements Resolve<any> {

  constructor(private auth: AuthService,
              private generalcollectionserv: GeneralcollectionService,
              private surveyserv: SurveyService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const path =  route['_routerState'].url.split('/');
    const type = path[path.length-2];
    return this.auth.user.pipe(
      take(1),
      tap(user => {
        this.generalcollectionserv.initializeMetaData(user[type]);
        if(type === 'SurveyResults') {
          const ID = path[path.length-1];
          this.surveyserv.assignSurveyResults(user[type]
            .find(survey => survey.ID === ID));
        }
      }) );
  }
}
