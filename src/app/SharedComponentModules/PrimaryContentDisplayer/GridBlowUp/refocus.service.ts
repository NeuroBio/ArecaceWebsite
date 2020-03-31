import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  Refocus = new Subject();
  Sorted = new Subject();

  triggerRefocus() {
    this.Refocus.next();
  }

  triggerSorted() {
    this.Sorted.next();
  }
  
}
