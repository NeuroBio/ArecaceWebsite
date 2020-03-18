import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder }       from '@angular/forms';

import { Subscription }                 from 'rxjs';

import { CRUDcontrollerService }        from 'src/app/administration/services/CRUDcontroller.service';
import { QuickAssign }                  from 'src/app/GlobalServices/commonfunctions.service';
import { UploadPreviewService }         from 'src/app/SharedComponentModules/SmallComponents/upload-preview/upload-preview.service';
import { FetchService }                 from 'src/app/GlobalServices/fetch.service';

import { UploadPreviewSettings }        from 'src/app/SharedComponentModules/SmallComponents/upload-preview/uploadpreviewclass';
import { OthersArt }                    from 'src/app/Classes/ContentClasses';
import { CRUDdata }                     from 'src/app/Classes/ContentClasses';

@Component({
  selector: 'app-pixelform',
  templateUrl: './pixelform.component.html',
  styleUrls: ['../../Form.css']
})
export class PixelformComponent implements OnInit, OnDestroy {

  Form: FormGroup;
  imageSettings = new UploadPreviewSettings([[250, 250, '100KB'], [undefined, undefined, '300KB']]);
  stream1: Subscription;
  stream2: Subscription;

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
    this.uploadpreviewserv.clear();
  }

  createForm() {
    return this.fb.group({
        Name: '',
        Links: '',
        ID: '',
        Date: '',
        Artist: '',
        ArtistLink: '',
        Allowed: 'false'
    });
  }
  
  assignFormData(editFormData: any) {
    this.onReset();
    if(editFormData) {
      this.Form = this.qa.assign(this.Form, editFormData);
      this.Form.patchValue({Allowed: editFormData.Allowed === true ? 'true' : 'false'});
      this.uploadpreviewserv.assignOldLinks(this.Form.controls.Links.value);
    }
  }

  processForm() {    
    const mainFile = this.uploadpreviewserv.mainsData[0];
    //Incomplete Form
    if((mainFile === undefined)
      && this.Form.controls.Links.value === '') {
      return this.controller.activeFormData.next(
        new CRUDdata(true, 'Pixel files require images.'));
    }
    
    //complete form
    const Final: OthersArt = Object.assign({}, this.Form.value);
    Final.ID = `${this.Form.controls.Name.value.split(' ').join('')}-by-${this.Form.controls.Artist.value.split(' ').join('')}`
    Final.ID = Final.ID.replace('\'', '');
    
    Final.Allowed = this.Form.value.Allowed === "true";

    return this.controller.activeFormData.next(
      new CRUDdata(false, '', Final,
                  [`OthersArt/${Final.ID}-pixel`],
                  [mainFile],
                  Final.Links));
  }

  onReset() {
    this.Form = this.createForm();
    this.uploadpreviewserv.reset.next();
    this.uploadpreviewserv.erase(0);
  }

}
