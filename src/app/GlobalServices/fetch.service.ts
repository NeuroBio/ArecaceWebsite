import { Injectable }                 from '@angular/core';
import { Subject, BehaviorSubject }   from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FetchService {

  processData = new Subject();
  activeFormData = new BehaviorSubject<any>(undefined);
  itemToEdit = new BehaviorSubject<any>(undefined);
  valid = new BehaviorSubject<boolean>(undefined);

  constructor() { }

  assignIntemtoEdit(item: any) {
    return this.itemToEdit.next(item);
  }
  
  assignActiveFormData(activeform: any) {
    return this.activeFormData.next(activeform);
  }

  fetchData() {
    return this.processData.next();
  }

  checkvalidity(valid: boolean) {
    return this.valid.next(valid);
  }
}
