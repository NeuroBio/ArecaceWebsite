import { Component, OnInit, OnDestroy } from '@angular/core';
import { SurveyService } from '../survey.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {

  results: any;
  SurveyData: string;
  stream1: Subscription;
  showAll = false;
  showStats = false;
  showSpecific: boolean[] = [];
  outcomes: string[] = [];
  tooLow: number;
  acceptable: boolean;

  constructor(private surveyserv: SurveyService) { }

  ngOnInit() {
    this.stream1 = this.surveyserv.surveyResults.subscribe(results => {
      if(results) {
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

  onReset(){
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
