import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterContentChecked } from '@angular/core';

import { Subscription } from 'rxjs';

import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-survey-stats',
  templateUrl: './survey-stats.component.html',
  styleUrls: ['./survey-stats.component.css']
})

export class SurveyStatsComponent implements OnInit, AfterContentChecked, OnDestroy {

  Stats: any = {};
  @ViewChild('holder', { static: true }) Holder: ElementRef;
  width = 500;
  height: number;
  stream: Subscription;

  constructor(private surveyserv: SurveyService) { }

  ngOnInit() {
    this.stream = this.surveyserv.currentSurveyStats.subscribe(counts => {
      if (counts) {
        this.displayData(counts);
      }
    });
  }

  ngAfterContentChecked() {
    setTimeout(() => { this.onResize(); }, 10);
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
    this.surveyserv.subDisposal();
  }

  displayData(counts: any) {
    if (counts) {
      const Counts = Object.assign({}, counts);
      delete Counts.ID;
      delete Counts.UploadTime;
      delete Counts.key;
      this.Stats.Keys = Object.keys(Counts);
      this.Stats.Counts = Object.values(Counts);
      this.Stats.Max = this.Stats.Counts.reduce((a, b) => a + b);
      this.Stats.Counts = this.Stats.Counts
        .map(count => count / this.Stats.Max);
      this.Stats.CountsDisplay = this.Stats.Counts
        .map(count => Math.trunc(count * 1000) / 10);
      this.height = 45 * this.Stats.Keys.length;
    }
  }

  onResize() {
      this.width = (this.Holder.nativeElement.getBoundingClientRect().right -
                    this.Holder.nativeElement.getBoundingClientRect().left);
  }
}
