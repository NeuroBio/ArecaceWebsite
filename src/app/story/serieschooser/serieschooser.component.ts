import { Component, OnInit, OnDestroy }     from '@angular/core';
import { ActivatedRoute, Router }           from '@angular/router'

import { Observable, Subscription }         from 'rxjs';
import { tap }                              from 'rxjs/operators';

import { StoryService }                     from '../story.service'
import { StoryMetaData }                    from 'src/app/Classes/storymetadata'

@Component({
  selector: 'app-serieschooser',
  templateUrl: './serieschooser.component.html',
  styleUrls: ['./serieschooser.component.css']
})

export class SeriesChooserComponent implements OnInit, OnDestroy {

  seriesIDs: string[];
  seriesNames: string[];
  
  series: string[];
  currentSeries: string;
  currentSection: string;
  stream1: Subscription;
  stream2: Subscription;
  stream3: Subscription;
  titles: StoryMetaData[];
  storyType: string;
  localLoading: boolean;

  constructor(private storyserv: StoryService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    window.scroll(0,0);
    
    this.storyserv.seriesIDName.subscribe(IDName => {
      this.seriesIDs = Object.keys(IDName);
      this.seriesNames = Object.values(IDName);
    });

    this.storyserv.getSeriesData().subscribe(titles => this.titles = titles);

    this.stream1 = this.storyserv.storyType.subscribe(string => { 
      this.localLoading = true;
      this.storyserv.updateLoading(true);
      this.storyType = string;
    });

    this.stream2 = this.storyserv.currentSeries.subscribe(ser => {
      this.currentSeries = ser;
      this.storyserv.updateLoading(true);
    });

    this.stream3 = this.storyserv.currentSection.subscribe(sec => {
      this.currentSection = sec;
      this.storyserv.updateLoading(true);
      this.localLoading = false;
    });
  }

  ngOnDestroy(){
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.stream3.unsubscribe();
  }

  changeSeries(series:string){
    this.router.navigate([`../${series}`], { relativeTo: this.route });
  }

  changeSection(section:string){
    this.router.navigate([`${section}`], { relativeTo: this.route });
  }

  updateType(scripts: string) {
    if(scripts === 'Scripts') {
      this.router.navigate([`../../Scripts`], { relativeTo: this.route });
    }else{
      this.router.navigate([`../../Narratives`], { relativeTo: this.route });
    }
  }
}
