import { Component, OnInit, ViewChild,
         OnDestroy, ElementRef }                  from '@angular/core';
import { Validators, FormBuilder, FormGroup }     from '@angular/forms';
import { Subscription }                           from 'rxjs';

import { CRUDcontrollerService }                  from '../../../services/CRUDcontroller.service';

import { BestDropDowns }                          from '../bestdropdowns';
import { BeastMetaData }                          from 'src/app/Classes/ContentClasses';
import { QuickAssign }                            from 'src/app/GlobalServices/commonfunctions.service';

@Component({
  selector: 'app-beastform',
  templateUrl: './beastform.component.html',
  styleUrls: ['../../Form.css']
})
export class BeastFormComponent implements OnInit, OnDestroy {

  dropDowns = new BestDropDowns();
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
  }

  createForm() {
    return this.fb.group({
      Name: ['', Validators.required],
      Phylo: 'Mammalia',
      Region: 'Escholzia',    
      Biome: 'Plains',
      Links: '',
      AltText: ''
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
       "Bestiary files require a card image and its thumbnail."]);
       return;
    }
    
    //Complete Form
    const Final:BeastMetaData = Object.assign({}, this.Form.value);
    Final.ID = Final.Name.split(' ').join('');
    
    this.controller.activeFormData.next([Final,
                                      [`Bestiary/${Final.ID}-thumb`,
                                      `Bestiary/${Final.ID}-full`],
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
    this.controller.message.next('');
  }
  
  getThumb(event:any) {
    this.thumbFile = event;
  }

  getFull(event:any) {
    this.fullFile = event;
  }

}
