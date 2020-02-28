import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from 'src/app/playground/surveys/survey-components/survey.service';
import { GeneralcollectionService } from 'src/app/GlobalServices/generalcollection.service';
import { FetchService } from 'src/app/GlobalServices/fetch.service';

@Component({
  selector: 'app-interact-details-switch',
  templateUrl: './interact-details-switch.component.html',
  styleUrls: ['./interact-details-switch.component.css']
})
export class InteractDetailsSwitchComponent implements OnInit {

  type: string;
  userData: any;
  constructor(private route: ActivatedRoute,
              private generalcollectionserv: GeneralcollectionService,
              private surveyserv: SurveyService,
              private fetcher: FetchService) { }

  ngOnInit() {
    this.type = this.generalcollectionserv.type.value;
    this.route.data.subscribe((data: {UserData: any}) => {
      window.scroll(0,0);
      this.userData = data.UserData
      switch(this.type) {
        case 'SurveyResults':
          this.surveyserv.assignSurveyResults(this.userData);
          return this.surveyserv.assignSurveyStats(this.userData.Name);

        case 'SAcalculations':
          this.fetcher.assignIntemtoEdit(this.userData);
      }
    });
  }

}
