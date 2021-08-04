import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }               from '@angular/router';

import { Observable }                   from 'rxjs';
import { map }                          from 'rxjs/operators';

import { GeneralcollectionService }     from 'src/app/GlobalServices/generalcollection.service';
import { AuthService }                  from 'src/app/administration/security/Auth/auth.service';
import { SurveyService }                from '../survey.service';
import { LinkList, LinkListElement }    from 'src/app/SharedComponentModules/SmallComponents/LinkList/linklist';
import { SurveyData } from 'src/app/Classes/ContentClasses';

@Component({
  selector: 'app-survey-main',
  templateUrl: './survey-main.component.html'
})

export class SurveyMainComponent implements OnInit, OnDestroy {

  current: string;
  surveys$: Observable<LinkList>;

  constructor(private generalcollectserv: GeneralcollectionService,
              private surveyserv: SurveyService,
              private route: ActivatedRoute,
              private auth: AuthService) { }

  ngOnInit() {
    this.surveys$ = this.generalcollectserv.returnMetaData().pipe(
      map((surveys: SurveyData[]) => {
        surveys.sort((a,b) => a[0] < b[0] ? -1 : 1);
        return new LinkList('Surveys',
          surveys.map(survey => new LinkListElement(survey.ID, survey.ID)) );
        }) );

    this.route.firstChild.paramMap.subscribe(
      path => this.current = path.get('SurveyID') );

    if(this.auth.isLoggedIn === false) {
      this.auth.anonymousLogin();
    }
  }

  ngOnDestroy() {
    this.surveyserv.mainDisposal();
  }

}
