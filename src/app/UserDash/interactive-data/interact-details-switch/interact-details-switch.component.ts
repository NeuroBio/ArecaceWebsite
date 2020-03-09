import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from 'src/app/playground/surveys/survey-components/survey.service';
import { GeneralcollectionService } from 'src/app/GlobalServices/generalcollection.service';
import { FetchService } from 'src/app/GlobalServices/fetch.service';
import { AuthService } from 'src/app/administration/security/Auth/auth.service';

@Component({
  selector: 'app-interact-details-switch',
  templateUrl: './interact-details-switch.component.html',
  styleUrls: ['./interact-details-switch.component.css']
})
export class InteractDetailsSwitchComponent implements OnInit {

  type: string;
  view: string;
  userData: any;
  editable: boolean

  constructor(private route: ActivatedRoute,
              private auth: AuthService,
              private surveyserv: SurveyService,
              private fetcher: FetchService) { }

  ngOnInit() {
    this.type = this.route.snapshot.parent.url[0].path;
    this.route.data.subscribe((data: {Data: any}) => {
      window.scroll(0,0);
      switch(this.type) {
        case 'SurveyResults':
          this.userData = data.Data
          this.editable = false;
          this.surveyserv.assignSurveyResults(this.userData);
          return this.surveyserv.assignSurveyStats(this.userData.Name);

        default :
          this.userData = data.Data
          this.editable = true;
          this.fetcher.assignItemtoEdit(this.userData);
      }
    });
    this.route.queryParams.subscribe(query => this.view = query.Action);
  }

}
