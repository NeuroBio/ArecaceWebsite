import { Component, OnInit, OnDestroy }         from '@angular/core';
import { FormBuilder, FormGroup }               from '@angular/forms';
import { Subscription }                         from 'rxjs';

import { CRUDcontrollerService }                from '../../../services/CRUDcontroller.service'
import { ReferenceCategories, AllPathInfo }   from '../../../../Classes/UploadDownloadPaths'
import { QuickAssign }                          from 'src/app/GlobalServices/commonfunctions.service';
import { UploadPreviewService }                 from 'src/app/SharedComponentModules/upload-preview/upload-preview.service';
import { UploadPreviewSettings }                from 'src/app/SharedComponentModules/upload-preview/uploadpreviewclass';
import { FetchService }                         from 'src/app/GlobalServices/fetch.service';
import { CRUDdata }                             from 'src/app/Classes/ContentClasses';

@Component({
  selector: 'app-referenceform',
  templateUrl: './referenceform.component.html',
  styleUrls: ['../../Form.css']
})

export class ReferenceFormComponent implements OnInit, OnDestroy {
  
  Form: FormGroup;
  stream1: Subscription;
  stream2: Subscription;
  imageSettings = new UploadPreviewSettings([[undefined, undefined, '100MB'], [200, 600, '300KB']]);

  
  cats = new ReferenceCategories;
  paths = new AllPathInfo;
  categories: string[];
  docPath: string;
  imagePath: 'Refs';
  type: string;

  constructor(private fb: FormBuilder,
              private controller: CRUDcontrollerService,
              private qa: QuickAssign,
              private uploadpreviewserv: UploadPreviewService,
              private fetcher: FetchService) { }

  ngOnInit() {
    this.controller.itemType.subscribe(type => {
      this.type = type;
      this.categories = this.cats[type];
      this.docPath = this.paths[type].Fire;
    }).unsubscribe();

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
    this.uploadpreviewserv.clear();
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
    this.onReset();
    if(editFormData) {
      this.Form = this.qa.assign(this.Form, editFormData);
      this.uploadpreviewserv.assignOldLinks(this.Form.controls.Links.value);
    }
  }

  processForm() {
    const imageFile = this.uploadpreviewserv.mainsData[0];

     //Incomplete Form
     if(imageFile === undefined
      && this.Form.controls.Links.value === '') {
      return this.controller.activeFormData.next(
        new CRUDdata(true, `${this.type} files require an image.`));
    }
    
    //Complete Form
    const Final = Object.assign({}, this.Form.value);
    Final.ID = this.Form.controls.Topic.value.split(' ').join('');

    return this.controller.activeFormData.next(
      new CRUDdata(false, '', Final,
                  [`${this.imagePath}/${Final.ID}`],
                  [imageFile],
                  Final.Links
    ));
  }

  onReset() {
    this.Form = this.createForm();
    this.Form.controls.Category.patchValue(this.categories[0]);
    this.uploadpreviewserv.reset.next();
    this.uploadpreviewserv.erase(0);
  }

}
