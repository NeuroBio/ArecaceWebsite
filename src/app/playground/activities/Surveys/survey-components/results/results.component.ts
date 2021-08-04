import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Subscription }                         from 'rxjs';

import { SurveyService }                        from '../survey.service';
import { FetchService }                         from 'src/app/GlobalServices/fetch.service';
import { LoginToSaveService }                   from 'src/app/SharedComponentModules/SmallComponents/login-to-save/login-to-save.service';

import { CRUDdata }                             from 'src/app/Classes/ContentClasses';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit, OnDestroy {

  @Input() ViewOnly: boolean = false;
  results: any;
  SurveyData: string;
  stream1: Subscription;
  showAll = false;
  showStats = false;
  showSpecific: boolean[] = [];
  outcomes: string[] = [];
  tooLow: number;
  acceptable: boolean;

  constructor(private surveyserv: SurveyService,
              private fetcher: FetchService,
              private logintosaveserv: LoginToSaveService) { }

  ngOnInit() {
    this.logintosaveserv.assignType('SurveyResults');
    this.fetcher.assignvalidity(true);
    this.stream1 = this.surveyserv.surveyResults.subscribe(results => {
      if(results) {
        this.fetcher.assignActiveFormData( new CRUDdata(false, '', results));
        this.results = results;
        this.showSpecific = [];
        this.results.AllScores.forEach(() => this.showSpecific.push(false));
        this.tooLow = this.results.AllScores.findIndex(x => x.Score < this.results.Limit);
        this.acceptable = this.results.Limit === undefined ? false : true;
      }
    });
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
  }

  onReset() {
    this.surveyserv.surveyResults.next(undefined);
    this.surveyserv.showSurvey.next(true);
  }

  setShowAll() {
    this.showAll = !this.showAll;
  }

  setShowSpecific(index: number) {
    this.showSpecific[index] = !this.showSpecific[index];
  }

  setShowStats() {
    this.showStats = !this.showStats;
  }
}
