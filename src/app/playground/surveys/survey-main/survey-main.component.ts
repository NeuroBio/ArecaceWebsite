import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralcollectionService } from 'src/app/GlobalServices/generalcollection.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/administration/security/Auth/auth.service';

@Component({
  selector: 'app-survey-main',
  templateUrl: './survey-main.component.html',
  styleUrls: ['./survey-main.component.css']
})
export class SurveyMainComponent implements OnInit {

  current: string;
  surveys$: Observable<string[]>;

  constructor(private generalcollectserv: GeneralcollectionService,
              private route: ActivatedRoute,
              private auth: AuthService) { }

  ngOnInit() {
    this.surveys$ = this.generalcollectserv.returnMetaData().pipe(
      map(surveys => {
        surveys = surveys.map(survey => [survey.ID, survey.ID]);
        return surveys.sort((a,b) => a[0] < b[0] ? -1 : 1)
      })
    )
    
    this.route.firstChild.paramMap.subscribe(
      path => this.current = path.get('SurveyID')
    );

    // if(!this.auth.user) {
      this.auth.anonymousLogin();
    // }
  }

}
