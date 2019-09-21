import { Injectable }                               from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot }  from '@angular/router';

import { of, EMPTY }                                from 'rxjs';
import { tap, take, flatMap }                                from 'rxjs/operators';

import { FireBaseService }                          from 'src/app/GlobalServices/firebase.service';
import { StoryService }                             from '../story.service';

@Injectable({
  providedIn: 'root'
})

export class StoryResolver2Service implements Resolve<any> {

  constructor(private router: Router,
              private storyserv: StoryService) { }

  //see the story service for notes
  resolve(route:ActivatedRouteSnapshot) {
    const type = route.parent.paramMap.get("StoryType")
    const series = this.checkUrl(route.paramMap.get("SeriesID"), type)
    const serials = this.storyserv.serials.value;
    const IDname = this.storyserv.seriesIDName.value;
    if(series in IDname) {
      const orderedSeries = serials[IDname[series]].sort((a,b) => a.Section < b.Section ? -1 : 1)
      this.storyserv.initializeSeriesData(orderedSeries);
      return of (orderedSeries)
    }else{
      this.router.navigate([`story/${type}`]);
      return EMPTY;
    }
      // flatMap(ID => this.storyserv.getSeries(ID).pipe(
      // tap(series => {
        // if(series[0]){
        //   series.sort((a,b) => a.Section < b.Section ? -1 : 1)
        //   this.storyserv.initializeSeriesData(series);
        //   this.storyserv.changeSeries(serie);
    //       return of (series)
    //     }else{
    //     }
    //   })
    // )
  }

  checkUrl(url:string, type:string){
    if(url === 'First'){
      if(type === "Scripts"){
        return "Arc1"
      }else{
        return "OneOffs"
      }
    }else{
      return url
    }
  }

  // checkUrl(url:string){
  //   if(url === 'First'){
  //     return this.storyserv.getSeriesData().pipe(
  //       map(serie => serie[0].ID))
  //   }else{
  //     return of (url)
  //   }
  // }

}
