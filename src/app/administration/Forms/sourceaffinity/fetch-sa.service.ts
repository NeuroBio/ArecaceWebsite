import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FetchSAService {

  processData = new Subject();
  activeFormData = new BehaviorSubject<any>(undefined);

  constructor() { }

  fetchSAData() {
    this.processData.next();
  }
}
