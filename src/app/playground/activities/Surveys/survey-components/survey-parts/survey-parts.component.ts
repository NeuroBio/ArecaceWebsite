import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription }                 from 'rxjs';

import { SurveyService }                from '../survey.service';

@Component({
  selector: 'app-survey-parts',
  templateUrl: './survey-parts.component.html'
})
export class SurveyPartsComponent implements OnInit, OnDestroy {

  showForm: boolean;
  stream1: Subscription;

  constructor(private surveyserv: SurveyService) { }

  ngOnInit() {
    this.stream1 = this.surveyserv.showSurvey.subscribe(show => this.showForm = show);
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
  }
}
