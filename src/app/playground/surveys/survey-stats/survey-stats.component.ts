import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterContentChecked } from '@angular/core';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-survey-stats',
  templateUrl: './survey-stats.component.html',
  styleUrls: ['./survey-stats.component.css']
})
export class SurveyStatsComponent implements OnInit, AfterContentChecked {

  Stats: any = {};
  @ViewChild('holder') Holder: ElementRef;
  width = 500;
  constructor(private surveyserv: SurveyService) { }

  ngOnInit() {
    this.surveyserv.surveyStats.subscribe(counts =>
      this.displayData(counts));
  }

  ngAfterContentChecked(){
    setTimeout(() => { this.onResize()}, 10);
  }

  displayData(counts: any) {
    if(counts){
      this.Stats.Keys = Object.keys(counts);
      this.Stats.Counts = Object.values(counts);
      this.Stats.Max = this.Stats.Counts.reduce((a,b) => a + b);
      this.Stats.Counts = this.Stats.Counts.map(count => count/this.Stats.Max);
      this.Stats.CountsDisplay = this.Stats.Counts.map(count => Math.trunc(count*1000)/10);
    }
  }

  onResize() {
      this.width = (this.Holder.nativeElement.getBoundingClientRect().right -
                    this.Holder.nativeElement.getBoundingClientRect().left)
  }
}
