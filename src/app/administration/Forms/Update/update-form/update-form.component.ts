import { Component, OnInit, OnDestroy }       from '@angular/core';
import { formatDate }                         from '@angular/common';
import { FormBuilder, FormGroup }             from '@angular/forms';

import { Subscription }                       from 'rxjs';

import { CRUDcontrollerService }              from 'src/app/administration/services/CRUDcontroller.service';
import { QuickAssign }                        from 'src/app/GlobalServices/commonfunctions.service';
import { UploadPreviewService }               from 'src/app/SharedComponentModules/upload-preview/upload-preview.service';
import { FetchService }                       from 'src/app/GlobalServices/fetch.service';

import { PostData }                           from 'src/app/Classes/ContentClasses';
import { UploadPreviewSettings }              from 'src/app/SharedComponentModules/upload-preview/uploadpreviewclass';
import { CRUDdata }                           from 'src/app/Classes/ContentClasses';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['../../Form.css']
})

export class UpdateFormComponent implements OnInit, OnDestroy {

  Form: FormGroup;
  imageSettings = new UploadPreviewSettings([[600, 600, '100MB'], [undefined, undefined, '300KB']]);
  stream1: Subscription;
  stream2: Subscription;
  oldPost: any;


  constructor(private fb: FormBuilder,
              private controller: CRUDcontrollerService,
              private qa: QuickAssign,
              private uploadpreviewserv: UploadPreviewService,
              private fetcher: FetchService) { }

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
    this.fetcher.disposal();
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
    const imageFile = this.uploadpreviewserv.mainsData[0];

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

    if(imageFile) {
      newImages = [imageFile];
    }

    this.controller.activeFormData.next(
      new CRUDdata(false, '', Final,
                  [`Inanity/${Final.ID}`],
                  newImages,
                  oldImages));
  }

  onReset() {
    this.Form = this.createForm();
    this.oldPost = undefined;
    this.uploadpreviewserv.reset.next();
    this.uploadpreviewserv.erase(0);
  }

}
