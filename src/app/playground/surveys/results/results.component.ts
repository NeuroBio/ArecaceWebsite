import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SurveyOutcome } from '../surveyclasses';
import { SurveyService } from '../survey.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {

  results: any;
  // = {Outcome: new SurveyOutcome(),
  //            Match: 89};
  stream1: Subscription;

  constructor(private surveyserv: SurveyService) { }

  ngOnInit() {
    this.stream1 = this.surveyserv.surveyResults.subscribe(results =>
      this.results = results);
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
  }

  onReset(){
    this.surveyserv.surveyResults.next(undefined);
    this.surveyserv.showSurvey.next(true);
  }
}
