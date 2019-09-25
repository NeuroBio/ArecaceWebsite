import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CRUDcontrollerService } from '../../services/CRUDcontroller.service';

@Component({
  selector: 'app-about-text',
  templateUrl: './about-text.component.html',
  styleUrls: ['../Form.css']
})
export class AboutTextComponent implements OnInit, OnDestroy {

  Form = this.createForm();
  stream1 = new Subscription();
  stop$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private controller: CRUDcontrollerService) { }

  ngOnInit() {
    this.controller.itemToEdit
    .pipe(takeUntil(this.stop$))
    .subscribe(item => {
      this.assignFormData(item);
    });

    this.stream1 = this.controller.triggerProcess.subscribe(() => this.processForm());
  }

  ngOnDestroy() {
    this.stop$.next(true);
    this.stream1.unsubscribe();
  }

  createForm() {
    return this.fb.group({
      ID: '',
      Hello: '',
      Story: '',
      Me: '',
      Website: ''
    });
  }

  assignFormData(editFormData: any) {
    if(editFormData) {
      this.onReset();
      this.Form = this.controller.quickAssign(this.Form, editFormData);
      this.stop$.next(true);
    }
  }

  processForm() {
    const Final = Object.assign({}, this.Form.value);
    this.controller.activeFormData.next([Final,
                                         [],
                                         [],
                                         undefined,
                                         undefined,
                                         undefined,
                                         undefined]);
  }

  onReset() {
    this.Form = this.createForm();
  }
}
