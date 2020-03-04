import { Component, OnInit, OnDestroy,
         ElementRef }                   from '@angular/core';
import { FormBuilder, FormGroup }       from '@angular/forms';
import { ViewChild }                    from '@angular/core'
import { Subscription }                 from 'rxjs';

import { CRUDcontrollerService }        from '../../../services/CRUDcontroller.service'
import { ExtrasMetaData }               from 'src/app/Classes/ContentClasses';
import { QuickAssign }                  from 'src/app/GlobalServices/commonfunctions.service';

@Component({
  selector: 'app-extrasform',
  templateUrl: './extrasform.component.html',
  styleUrls: ['../../Form.css']
})
export class ExtrasFormComponent implements OnInit, OnDestroy {

  Form: FormGroup;
  @ViewChild('Thumb', { static: true }) thumbUploader: ElementRef;
  @ViewChild('Full', { static: true }) fullUploader: ElementRef;
  thumbFile: any;
  fullFile: any;

  stream1: Subscription;
  stream2: Subscription;

  constructor(private fb: FormBuilder,
              private controller: CRUDcontrollerService,
              private qa: QuickAssign) { }

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
        Name:'',
        Links: '',
        Description:'',
        Date:''
    });
  }
  
  assignFormData(editFormData: any) {
    this.onReset();
    if(editFormData) {
      this.Form = this.qa.assign(this.Form, editFormData);
    }
  }

  processForm() {
    //Incomplete Form
    if((this.thumbFile === undefined
        || this.fullFile === undefined)
      && this.Form.controls.Links.value === '') {
      this.controller.activeFormData.next(["abort",
        "Misc files require full and thumb images."]);
      return ;
    }
    const Final:ExtrasMetaData = Object.assign({}, this.Form.value);
    Final.ID = this.Form.controls.Name.value.split(' ').join('');
    Final.ID = Final.ID.replace('\'', '');

    this.controller.activeFormData.next([Final,
                                        [`MiscArt/${Final.ID}-thumb`,
                                        `MiscArt/${Final.ID}-full`],
                                        [this.thumbFile, this.fullFile],
                                        Final.Links,
                                        undefined,
                                        undefined,
                                        undefined]);
  }

  onReset() {
    this.Form = this.createForm();
    this.thumbFile = undefined;
    this.fullFile = undefined;
    this.thumbUploader.nativeElement.value = '';
    this.fullUploader.nativeElement.value = '';
  }
  
  getThumb(event:any) {
    this.thumbFile = event;
  }

  getFull(event:any) {
    this.fullFile = event;
  }
}
