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
  titlesInSeries: StoryMetaData[];
  storyType: string;
  localLoading: boolean;

  stream1: Subscription;
  stream2: Subscription;
  stream3: Subscription;
  stream4: Subscription;
  stream5: Subscription;
  

  constructor(private storyserv: StoryService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    window.scroll(0,0);
    
    this.stream1 = this.storyserv.seriesIDName.subscribe(IDName => {
      this.seriesIDs = Object.keys(IDName);
      this.seriesNames = Object.values(IDName);
    });

    this.stream2 = this.storyserv.getSeriesData().subscribe(titles =>
      this.titlesInSeries = titles);

    this.stream3 = this.storyserv.storyType.subscribe(string => { 
      this.localLoading = true;
      this.storyserv.updateLoading(true);
      this.storyType = string;
    });

    this.stream4 = this.storyserv.currentSeries.subscribe(ser => {
      this.currentSeries = ser;
      this.storyserv.updateLoading(true);
    });

    this.stream5 = this.storyserv.currentSection.subscribe(sec => {
      this.currentSection = sec;
      this.storyserv.updateLoading(true);
      this.localLoading = false;
    });
  }

  ngOnDestroy(){
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.stream3.unsubscribe();
    this.stream4.unsubscribe();
    this.stream5.unsubscribe();
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
