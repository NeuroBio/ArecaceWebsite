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
  loading = new BehaviorSubject<boolean>(undefined);

  nameTokens: string[];
  type: string;

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

  assignUserDataInfo (tokens: string[], type: string): void {
    this.nameTokens = tokens;
    this.type = type;
  }

  assignLoading(load: boolean): void {
    this.loading.next(load);
  }

  disposal() {
    this.assignLoading(undefined);
  }
}
