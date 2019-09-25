import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CRUDcontrollerService } from '../../services/CRUDcontroller.service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-website-text',
  templateUrl: './website-text.component.html',
  styleUrls: ['../Form.css']
})

export class WebsiteTextComponent implements OnInit, OnDestroy {

  Form = this.createForm();
  stream1 = new Subscription();
  stop$ = new Subject<boolean>();
  key: string;

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
      Text: ''
    });
  }

  assignFormData(editFormData: any) {
    if(editFormData) {
      this.onReset();
      this.key = editFormData.key;
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
