import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetRouteSegmentsService {

  constructor() { }

  fetch(pathtoRoot: any[]) {
    const Path = [];
    pathtoRoot.pop(); //remove current final segment
    pathtoRoot.forEach((segment, i) => {
      if(i > 0 && segment.url != '') { //ignore root and any weirdness I can't explain
        Path.push(segment.url);
      }
    });
    return Path.join('/');
  }
}
