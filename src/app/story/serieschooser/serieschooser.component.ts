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

  seriesMetaData$: Observable<any[]>
  series: string[];
  currentSeries: string;
  currentSection: string;
  stream1: Subscription;
  stream2: Subscription;
  stream3: Subscription;
  titles: StoryMetaData[];
  type: boolean;
  localLoading: boolean;

  constructor(private storyserv: StoryService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    window.scroll(0,0);

    this.seriesMetaData$ = this.storyserv.getMetaData().pipe(
      tap(() =>
        this.storyserv.getSeriesData().subscribe(titles => this.titles = titles))
    );

    this.stream1 = this.storyserv.script.subscribe(bool => { 
      this.localLoading = true;
      this.storyserv.updateLoading(true);
      this.type = bool;
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

  changeType(scripts:Boolean){
    if(scripts){
      this.router.navigate([`../../Scripts`], { relativeTo: this.route });
    }else{
      this.router.navigate([`../../Narratives`], { relativeTo: this.route });
    }
  }
}
