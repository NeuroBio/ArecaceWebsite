import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CRUDcontrollerService } from '../../../services/CRUDcontroller.service';
import { FetchSAService } from '../fetch-sa.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-source-affinity',
  templateUrl: './source-affinity.component.html',
  styleUrls: ['../../Form.css']
})
export class SourceAffinityComponent implements OnInit, OnDestroy {

  Form: FormGroup

  stream1: Subscription;
  stream2: Subscription;
  
  constructor(private fb: FormBuilder,
              private controller: CRUDcontrollerService,
              private fetcher: FetchSAService) { }

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

  createForm() {
    return this.fb.group({
      Name: ['', Validators.required],
    });
  }

  assignFormData(editFormData: any) {
    this.onReset();
    if(editFormData) {
      this.Form = this.controller.quickAssign(this.Form, editFormData);
    }
  }

  processForm() {
    this.fetcher.fetchSAData();

    return this.fetcher.activeFormData.pipe(take(1))
      .subscribe(Final => {
        Final.Name = this.Form.value.Name;
        Final.ID = `${Final.Name.split(' ').join('')}-(${Final.Cost})`;
        this.controller.activeFormData.next([Final,
                                            [],
                                            [],
                                            [],
                                            undefined,
                                            undefined,
                                            undefined]);
      });
    //Complete Form
    // const Final = Object.assign({}, this.Form.value);
    // Final.ID = Final.Name.split(' ').join('');
  }
  
  onReset() {
    this.Form = this.createForm();
    this.controller.message.next('');
  }
  
}
