import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CRUDcontrollerService } from '../../../services/CRUDcontroller.service';
import { UploadPreviewService } from 'src/app/SharedComponentModules/SharedForms/UploadPreview//upload-preview.service';

import { QuickAssign } from 'src/app/GlobalServices/commonfunctions.service';
import { UploadPreviewSettings } from 'src/app/SharedComponentModules/SharedForms/UploadPreview//uploadpreviewclass';
import { FetchService } from 'src/app/GlobalServices/fetch.service';

import { BestDropDowns } from '../bestdropdowns';
import { BeastMetaData } from 'src/app/Classes/ContentClasses';
import { CRUDdata } from 'src/app/Classes/ContentClasses';

@Component({
  selector: 'app-beastform',
  templateUrl: './beastform.component.html',
  styleUrls: ['../../Form.css']
})

export class BeastFormComponent implements OnInit, OnDestroy {

  dropDowns = new BestDropDowns();
  Form: FormGroup;
  imageSettings = new UploadPreviewSettings([[undefined, undefined, '100MB'], [200, 600, '300KB']]);

  stream1: Subscription;
  stream2: Subscription;
 
  constructor(
    private fb: FormBuilder,
    private controller: CRUDcontrollerService,
    private qa: QuickAssign,
    private uploadpreviewserv: UploadPreviewService,
    private fetcher: FetchService
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
    this.fetcher.disposal();
    this.controller.disposal();
    this.uploadpreviewserv.clear();
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
    if (editFormData) {
      this.Form = this.qa.assign(this.Form, editFormData);
      this.uploadpreviewserv.assignOldLinks(this.Form.controls.Links.value);
    }
  }

  processForm() {
    const mainFile = this.uploadpreviewserv.mainsData[0];
    const thumbFile = this.uploadpreviewserv.thumbsData[0];
    // Incomplete Form
     if ((thumbFile === undefined
          || mainFile === undefined)
        && this.Form.controls.Links.value === '') {
      return this.controller.activeFormData.next(
        new CRUDdata(true, 'Bestiary files require a card image and its thumbnail.'));
    }

    // Complete Form
    const Final: BeastMetaData = Object.assign({}, this.Form.value);
    Final.ID = Final.Name.split(' ').join('');

    return this.controller.activeFormData.next(
      new CRUDdata(false, '', Final,
                  [`Bestiary/${Final.ID}-thumb`,
                  `Bestiary/${Final.ID}-full`],
                  [thumbFile, mainFile],
                  Final.Links));
  }

  onReset() {
    this.Form = this.createForm();
    this.controller.message.next('');
    this.uploadpreviewserv.reset.next();
    this.uploadpreviewserv.erase(0);
  }

}
