import { Component, OnInit, OnDestroy } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Subscription } from 'rxjs';

import { CRUDcontrollerService } from 'src/app/administration/services/CRUDcontroller.service';
import { QuickAssign } from 'src/app/GlobalServices/commonfunctions.service';

import { LooseNotesMetaData } from 'src/app/Classes/ContentClasses';
import { CRUDdata } from 'src/app/Classes/ContentClasses';
@Component({
  selector: 'app-loose-notes-form',
  templateUrl: './loose-notes-form.component.html',
  styleUrls: ['../../Form.css']
})
export class LooseNotesFormComponent implements OnInit, OnDestroy {

  Form: FormGroup;
  stream1: Subscription;
  stream2: Subscription;
  oldNote: boolean;

  constructor(
    private fb: FormBuilder,
    private qa: QuickAssign,
    private controller: CRUDcontrollerService
  ) { }

  ngOnInit() {
    this.stream1 = this.controller.itemToEdit
      .subscribe(item => this.assignFormData(item));
    this.stream2 = this.controller.triggerProcess
      .subscribe(() => this.processForm());
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.controller.disposal();
  }

  createForm() {
    return this.fb.group({
      Title: '',
      ShortTitle: '',
      Text: '',
      ID: '',
      Created: '',
    });
  }

  assignFormData(editFormData) {
    this.onReset();
    if (editFormData) {
      this.oldNote = true;
      this.Form = this.qa.assign(this.Form, editFormData);
    }
  }

  processForm() {
    const Final: LooseNotesMetaData = Object.assign({}, this.Form.value);
    if (!this.oldNote) {
      const Today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      const Time = formatDate(new Date(), 'HH:mm', 'en');
      Final.Created = `${Today}, ${Time}`;
      Final.ID = `${Final.ShortTitle.split(' ').join('')}-${Today}`;
    } else {
      Final.Modified = formatDate(new Date(), 'yyyy-MM-dd, HH:mm', 'en');
    }

    return this.controller.activeFormData.next(
      new CRUDdata(false, '', Final,
      [`LooseNotes/${Final.ID}`], [], []));
  }

  onReset() {
    this.Form = this.createForm();
    this.oldNote = false;
  }

}
