import { Component, OnInit, OnDestroy,
         ElementRef }                   from '@angular/core';
import { FormBuilder }                  from '@angular/forms';
import { ViewChild }                    from '@angular/core'
import { Subscription }                 from 'rxjs';

import { CRUDcontrollerService }        from '../../../services/CRUDcontroller.service'
import { ExtrasMetaData }               from 'src/app/Classes/extrasmetadata';

@Component({
  selector: 'app-extrasform',
  templateUrl: './extrasform.component.html',
  styleUrls: ['../../Form.css']
})
export class ExtrasFormComponent implements OnInit, OnDestroy {

  Form = this.createForm();
  @ViewChild('Thumb') thumbUploader: ElementRef;
  @ViewChild('Full') fullUploader: ElementRef;
  thumbFile: any;
  fullFile: any;

  stream1: Subscription;
  stream2: Subscription;
  init = true;

  constructor(private fb: FormBuilder,
              private controller: CRUDcontrollerService) { }

  ngOnInit() {
    this.stream1 = this.controller.itemToEdit.subscribe(item => {
      this.assignFormData(item);
      this.init = false;
    });
    this.stream2 = this.controller.triggerProcess.subscribe(() => this.processForm());
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
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
    if(editFormData) {
      this.onReset();
      this.Form = this.controller.quickAssign(this.Form, editFormData);
    }else if(!this.init) {
      this.onReset();
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
