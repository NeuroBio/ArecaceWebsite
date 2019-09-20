import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Validators, FormBuilder }        from '@angular/forms';
import { ViewChild } from '@angular/core'

import { CRUDcontrollerService }  from '../../../services/CRUDcontroller.service'

import { BestDropDowns } from '../bestdropdowns'
import { BeastMetaData } from 'src/app/Classes/beastmetadata';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-beastform',
  templateUrl: './beastform.component.html',
  styleUrls: ['../../Form.css']
})
export class BeastFormComponent implements OnInit, OnDestroy {

  dropDowns = new BestDropDowns();
  Form = this.createForm();
  @ViewChild('Thumb') thumbUploader: ElementRef;
  @ViewChild('Full') fullUploader: ElementRef;
  thumbFile: any;
  fullFile: any;

  editFormData: any;
  stream1: Subscription;
  stream2: Subscription;
  init = true;
  
  constructor(private fb: FormBuilder,
              private controller: CRUDcontrollerService) { }

  ngOnInit() {
    this.stream1 = this.controller.itemToEdit.subscribe(item => {
      this.editFormData = item;
      this.assignFormData();
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
      Name: ['', Validators.required],
      Phylo: 'Mammalia',
      Region: 'Escholzia',    
      Biome: 'Plains',
      Links: '',
      AltText: ''
    });
  }

  assignFormData() {
    if(this.editFormData) {
      this.onReset();
      this.Form = this.controller.quickAssign(this.Form, this.editFormData);
    } else if(!this.init) {
      this.onReset();
    }
  }

  processForm() {
    //Incomplete Form
     if((this.thumbFile === undefined
          || this.fullFile === undefined)
        && this.Form.controls.Links.value === '') {
       this.controller.activeFormData.next(["abort",
       "Bestiary files require a card image and its thumbnail."]);
       return ;
    }
    
    //Complete Form
    const Final:BeastMetaData = this.Form.value;
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
    this.thumbFile=undefined;
    this.fullFile=undefined;
    this.thumbUploader.nativeElement.value='';
    this.fullUploader.nativeElement.value='';
    this.controller.message.next('');
  }
  
  getThumb(event:any) {
    this.thumbFile = event;
  }

  getFull(event:any) {
    this.fullFile = event;
  }

}
