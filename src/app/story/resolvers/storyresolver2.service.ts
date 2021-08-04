import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { of, EMPTY } from 'rxjs';
import { StoryService } from '../story.service';

@Injectable({
  providedIn: 'root'
})

export class StoryResolver2Service implements Resolve<any> {

  constructor(private router: Router,
              private storyserv: StoryService) { }

  //see the story service for notes
  resolve(route:ActivatedRouteSnapshot) {
    const type = route.parent.paramMap.get('StoryType');
    const series = route.paramMap.get('SeriesID');
    if (this.checkUrl(series, type) === true) {
      return;
    }
    const serials = this.storyserv.serials.value;
    const IDname = this.storyserv.seriesIDName.value;
    if (series in IDname) {
      const orderedSeries = serials[IDname[series]].sort((a, b) => a.Section < b.Section ? -1 : 1);
      this.storyserv.initializeSeriesData(orderedSeries);
      this.storyserv.changeSeries(series);
      return of (orderedSeries);
    } else {
      this.router.navigate([`story/${type}`]);
      return EMPTY;
    }
  }

  checkUrl(url: string, type: string) {
    if (url === 'First') {
      if (type === 'Scripts') {
        this.router.navigate([`story/${type}/Arc1`]);
        return true;
      } else {
        this.router.navigate([`story/${type}/OneOffs`]);
        return true;
      }
    } else {
      return false;
    }
  }

}
