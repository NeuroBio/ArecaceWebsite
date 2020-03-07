import { Injectable }                 from '@angular/core';

import { Subject, BehaviorSubject }   from 'rxjs';

import { CRUDdata }                   from 'src/app/Classes/ContentClasses';
@Injectable({
  providedIn: 'root'
})

export class FetchService {

  processData = new Subject();
  activeFormData = new BehaviorSubject<CRUDdata>(undefined);
  itemToEdit = new BehaviorSubject<any>(undefined);
  valid = new BehaviorSubject<boolean>(undefined);
  loading = new BehaviorSubject<boolean>(undefined);

  constructor() { }

  assignItemtoEdit(item: any): void {
    this.itemToEdit.next(item);
  }
  
  assignActiveFormData(activeform: any): void {
    this.activeFormData.next(activeform);
  }

  fetchData(): void {
    this.processData.next();
  }

  assignvalidity(valid: boolean): void {
    this.valid.next(valid);
  }

  assignLoading(load: boolean): void {
    this.loading.next(load);
  }

  disposal() {
    this.assignItemtoEdit(undefined);
    this.assignActiveFormData(undefined);
    this.assignLoading(undefined);
  }
}
