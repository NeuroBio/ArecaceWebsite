import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeneralcollectionService } from 'src/app/GlobalServices/generalcollection.service';
import { SurveyService } from 'src/app/playground/surveys/survey-components/survey.service';

@Component({
  selector: 'app-interact-home',
  templateUrl: './interact-home.component.html',
  styleUrls: ['./interact-home.component.css']
})
export class InteractHomeComponent implements OnInit, OnDestroy {

  type: string;
  current: string;
  userData$: Observable<string[][][]>;

  constructor(private generalcollectionserv: GeneralcollectionService,
              private surveyserv: SurveyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.userData$ = this.generalcollectionserv.returnMetaData().pipe(
      map(userdata => userdata.map(datum => ['fu', datum.ID])));
    this.current = this.route.snapshot.firstChild.url[0].path
    this.type = this.route.snapshot.url[0].path
  }

  ngOnDestroy() {
    console.log(this.current)
    if(this.type === 'SurveyResults') {
        this.surveyserv.mainDisposal();
    }
  }

}
