import { Component, OnInit, OnDestroy }       from '@angular/core';

import { Subscription }                       from 'rxjs';
import { take }                               from 'rxjs/operators';

import { CRUDcontrollerService }              from '../../../services/CRUDcontroller.service';
import { FetchService }                     from '../../../../GlobalServices/fetch.service';

@Component({
  selector: 'app-source-affinity',
  templateUrl: './source-affinity.component.html',
  styleUrls: ['../../Form.css']
})
export class SourceAffinityComponent implements OnInit, OnDestroy {

  stream1: Subscription;
  stream2: Subscription;
  
  constructor(private controller: CRUDcontrollerService,
              private fetcher: FetchService) { }

  ngOnInit() {
    this.stream1 = this.controller.itemToEdit
      .subscribe(item => this.assignFormData(item));
    this.stream2 = this.controller.triggerProcess
      .subscribe(() => this.processForm());
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
  }

  assignFormData(editFormData: any) {
    this.onReset();
    if(editFormData) {
      this.fetcher.assignIntemtoEdit(editFormData);
    }
  }

  processForm() {
    this.fetcher.fetchData();
    return this.fetcher.activeFormData.pipe(take(1))
      .subscribe(Final => this.controller.activeFormData.next(Final));
  }
  
  onReset() {
    this.fetcher.assignIntemtoEdit(undefined);
    this.controller.message.next('');
  }
  
}
