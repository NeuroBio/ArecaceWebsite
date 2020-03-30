import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefocusService {

  Refocus = new Subject();

  triggerRefocus() {
    this.Refocus.next();
  }
  
}
