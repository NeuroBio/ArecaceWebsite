import { Component, OnInit, ViewChild,
         ElementRef, OnDestroy }          from '@angular/core';
import { FormBuilder }                    from '@angular/forms';
import { Subscription }                   from 'rxjs';

import { CRUDcontrollerService }          from '../../../services/CRUDcontroller.service'
import { Categories, Paths }              from '../../../../Classes/categories'


@Component({
  selector: 'app-referenceform',
  templateUrl: './referenceform.component.html',
  styleUrls: ['../../Form.css']
})

export class ReferenceFormComponent implements OnInit, OnDestroy {
  
  Form = this.createForm();
  @ViewChild('image') imageUploader: ElementRef;
  imageFile:any;
  stream1: Subscription;
  stream2: Subscription;

  init = true;
  
  cats = new Categories;
  pats = new Paths;
  categories: string[];
  docPath: string;
  imagePath: string;
  type: string;

  constructor(private fb: FormBuilder,
              private controller: CRUDcontrollerService) { }

  ngOnInit() {
    this.stream1 = this.controller.itemToEdit.subscribe(item => {
      this.assignFormData(item);
      this.init = false;
    });
    this.stream2 = this.controller.triggerProcess.subscribe(() => this.processForm());

    this.controller.itemType.subscribe(type => {
      this.type = type;
      this.categories = this.cats[type];
      this.docPath = this.pats[type][0];
      this.imagePath = this.pats[type][1];
      this.Form.controls.Category.patchValue(this.categories[0]);
    }).unsubscribe();
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
  }

  createForm() {
    return this.fb.group({
      ID: '',
      Category: '',
      Topic: '',
      Caption: '',
      FullText: '',
      Links: ''
    });
  }

  assignFormData(editFormData: any) {
    if(editFormData) {
      this.onReset();
      this.Form = this.controller.quickAssign(this.Form, editFormData);
    } else if(!this.init) {
      this.onReset();
    }
  }

  processForm() {
     //Incomplete Form
     if(this.imageFile === undefined
      && this.Form.controls.Links.value === '') {
      this.controller.activeFormData.next(["abort",
        `${this.type} files require an image.`]);
      return;
    }
    
    //Complete Form
    const Final = Object.assign({}, this.Form.value);
    Final.ID = this.Form.controls.Topic.value.split(' ').join('');

    this.controller.activeFormData.next([Final,
                                      [`${this.imagePath}/${Final.ID}`],
                                      [this.imageFile],
                                      Final.Links,
                                      undefined,
                                      undefined,
                                      undefined]);
  }

  onReset() {
    this.Form = this.createForm();
    this.Form.controls.Category.patchValue(this.categories[0]);
    this.imageFile = undefined;
    this.imageUploader.nativeElement.value = '';
  }

  getImage(event:any) {
    this.imageFile = event;
  }

}
