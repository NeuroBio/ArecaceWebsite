import { Component, OnInit, OnDestroy }     from '@angular/core';
import { ActivatedRoute }                   from '@angular/router';

import { Subscription }                     from 'rxjs';

import { SurveyService }                    from 'src/app/playground/activities/Surveys/survey-components/survey.service';
import { FetchService }                     from 'src/app/GlobalServices/fetch.service';
import { DisplayService }                   from '../display.service';

@Component({
  selector: 'app-interact-details-switch',
  templateUrl: './interact-details-switch.component.html',
  styleUrls: ['./interact-details-switch.component.css']
})
export class InteractDetailsSwitchComponent implements OnInit, OnDestroy {

  type: string;
  view: string;
  userData: any;
  editable: boolean
  stream: Subscription;

  constructor(private route: ActivatedRoute,
              private surveyserv: SurveyService,
              private displayserv: DisplayService,
              private fetcher: FetchService) { }

  ngOnInit() {
    this.type = this.route.snapshot.parent.url[0].path;
    this.route.data.subscribe((data: { Data: any }) => {
      window.scroll(0,0);
      this.userData = data.Data;
      switch(this.type) {
        case 'SurveyResults':
          this.editable = false;
          this.surveyserv.assignSurveyResults(this.userData);
          return this.surveyserv.assignSurveyStats(this.userData.ID);

        default :
          if(this.stream) {
            this.stream.unsubscribe();
          }
          this.editable = true;
          this.stream = this.displayserv.currentUserDatum
            .subscribe(datum => this.fetcher.assignItemtoEdit(datum));
      }
    });

    this.route.queryParams.subscribe(query => this.view = query.Action);
  }

  ngOnDestroy() {
    if(this.stream) {
      this.stream.unsubscribe();
    }
  }

}
