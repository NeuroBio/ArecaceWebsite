import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetRouteSegmentsService {

  constructor() { }

  fetch(pathtoRoot: any[], pop: boolean = true) {
    const Path = [];
    if(pop) {
      pathtoRoot.pop(); //remove current final segment
    }
    pathtoRoot.forEach((segment, i) => {
      if(i > 0 && segment.url != '') { //ignore root and any weirdness I can't explain
        Path.push(segment.url);
      }
    });
    return Path.join('/');
  }
}
