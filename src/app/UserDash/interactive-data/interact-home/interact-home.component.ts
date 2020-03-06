import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }               from '@angular/router';

import { Observable }                   from 'rxjs';
import { map }                          from 'rxjs/operators';

import { GeneralcollectionService }     from 'src/app/GlobalServices/generalcollection.service';
import { SurveyService }                from 'src/app/playground/surveys/survey-components/survey.service';
import { FetchService }                 from 'src/app/GlobalServices/fetch.service';

@Component({
  selector: 'app-interact-home',
  templateUrl: './interact-home.component.html',
  styleUrls: ['./interact-home.component.css']
})

export class InteractHomeComponent implements OnInit, OnDestroy {

  type: string;
  displayType: string;
  current: string;
  userData$: Observable<string[][][]>;
  displayTypes = {FanCharacters: 'Fan Characters',
                SAcalculations: 'SA Calculations',
                SurveyResults: 'Survey Results'};

  constructor(private generalcollectionserv: GeneralcollectionService,
              private surveyserv: SurveyService,
              private fetcher: FetchService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.userData$ = this.generalcollectionserv.returnMetaData()
      .pipe(map(userdata =>
      userdata.map(datum => [datum.DisplayName.split('-').join(' '), datum.ID])
    ));

    if(this.route.snapshot.firstChild) {
      this.current = this.route.snapshot.firstChild.url[0].path;
    }
    this.type = this.route.snapshot.url[0].path;
    this.displayType = this.displayTypes[this.type];
  }

  ngOnDestroy() {
    switch(this.type) {
      case 'SurveyResults':
        return this.surveyserv.mainDisposal();
      
      case 'SAcalculations':
        this.fetcher.assignActiveFormData(undefined);
        return this.fetcher.assignItemtoEdit(undefined);
    }
  }

}
