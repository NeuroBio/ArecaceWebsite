import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable }                   from 'rxjs';
import { map }                          from 'rxjs/operators';

import { SurveyService }                from 'src/app/playground/surveys/survey-components/survey.service';
import { FetchService }                 from 'src/app/GlobalServices/fetch.service';
import { DisplayService } from '../display.service';

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

  constructor(private displayserv: DisplayService,
              private surveyserv: SurveyService,
              private fetcher: FetchService) { }

  ngOnInit() {
    this.current = this.displayserv.currentID.value;
    this.type = this.displayserv.currentDataType.value
    this.displayType = this.displayTypes[this.type];
    this.userData$ = this.displayserv.currentUserData
      .pipe(map(list => list.map(datum => [datum.DisplayName, datum.ID])
    ));
  }

  ngOnDestroy() {
    switch(this.type) {
      case 'SurveyResults':
        return this.surveyserv.mainDisposal();
      
      default:
        return this.fetcher.disposal();
    }
  }

}
