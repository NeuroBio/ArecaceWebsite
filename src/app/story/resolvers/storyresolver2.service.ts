import { Injectable }                               from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot }  from '@angular/router';

import { of, EMPTY }                                from 'rxjs';
import { tap, take }                                from 'rxjs/operators';

import { FireBaseService }                          from 'src/app/GlobalServices/firebase.service';
import { StoryService }                             from '../story.service';

@Injectable({
  providedIn: 'root'
})

export class StoryResolver2Service implements Resolve<any> {

  constructor(private firebaseserv: FireBaseService,
              private router: Router,
              private storyserv: StoryService) { }

  resolve(route:ActivatedRouteSnapshot){
    const type = route.parent.paramMap.get("StoryType")
    const serie = this.checkUrl(route.paramMap.get("SeriesID"), type)

    return this.firebaseserv.returnCollect(`${type}/${serie}/${serie}`).pipe(
      take(1),
      tap(series => {
        if(series[0]){
          series.sort((a,b) => a.Section < b.Section ? -1 : 1)
          this.storyserv.initializeSeriesData(series);
          this.storyserv.changeSeries(serie);
          return of (series)
        }else{
          this.router.navigate([`story/${type}`]);
          return EMPTY;
        }
      })
    )
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

}
