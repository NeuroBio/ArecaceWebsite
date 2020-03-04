import { Component, OnInit, ViewChild,
         ElementRef, OnDestroy }              from '@angular/core';
import { formatDate }                         from '@angular/common';
import { FormBuilder, FormGroup }             from '@angular/forms';

import { Subscription }                       from 'rxjs';

import { CRUDcontrollerService }              from 'src/app/administration/services/CRUDcontroller.service';
import { PostData }                           from 'src/app/Classes/ContentClasses';
import { QuickAssign }                        from 'src/app/GlobalServices/commonfunctions.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['../../Form.css']
})

export class UpdateFormComponent implements OnInit, OnDestroy {

  Form: FormGroup;
  @ViewChild('Image', { static: true }) imageUploader: ElementRef;
  imageFile: any;
  stream1: Subscription;
  stream2: Subscription;
  oldPost: any;


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
      Poster: 'kArA',
      Body: '',
      AltText: '',
      Links: '',
      Date: '',
      Time: '',
      Edited: false
    });
  }

  assignFormData(editFormData) {
    this.onReset();
    if(editFormData) {
      this.Form = this.qa.assign(this.Form, editFormData);
    }
  }

  processForm() {
    const Final: PostData = Object.assign({}, this.Form.value);
    let oldImages: string[] = [];
    let newImages: any[] = [];

    if(!this.oldPost) {
      Final.Date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      Final.Time = formatDate(new Date(), 'HH:mm', 'en');
      Final.ID = `${Final.Date}, ${Final.Time}`;
    } else {
      Final.Date = this.oldPost.Date;
      Final.Time = this.oldPost.Time;
      Final.ID = this.oldPost.ID;
      Final.Edited = true;
      if(this.oldPost.Links) {
        oldImages = this.oldPost.Links;
      }
    }

    if(this.imageFile) {
      newImages = [this.imageFile];
    }

    this.controller.activeFormData.next([Final,
                                        [`Inanity/${Final.ID}`],
                                        newImages,
                                        oldImages,
                                        undefined,
                                        undefined,
                                        undefined]);
  }

  onReset() {
    this.Form = this.createForm();
    this.imageUploader.nativeElement.value = '';
    this.imageFile = undefined;
    this.oldPost = undefined;
  }

  onFile(event: any) {
    this.imageFile = event;
  }
}
