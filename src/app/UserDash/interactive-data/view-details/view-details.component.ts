import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from 'src/app/playground/surveys/survey-components/survey.service';
import { GeneralcollectionService } from 'src/app/GlobalServices/generalcollection.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {

  type: string;
  constructor(private surveyserv: SurveyService,
              private route: ActivatedRoute,
              private generalcollectionserv: GeneralcollectionService) { }

  ngOnInit() {
    this.type = this.generalcollectionserv.type.value;
    this.route.data.subscribe((data: {UserData: any}) => {
      window.scroll(0,0);
      if(this.type === 'SurveyResults') {
        this.surveyserv.assignSurveyResults(data.UserData);
        this.surveyserv.assignSurveyStats(data.UserData.Name);
      }
    })
  }

}
