import { Component, OnInit, ViewChild,
         OnDestroy, ElementRef }        from '@angular/core';
import { FormBuilder, FormGroup }       from '@angular/forms';
import { Subscription }                 from 'rxjs';

import { CRUDcontrollerService }        from '../../../services/CRUDcontroller.service';
import { QuickAssign }                  from 'src/app/GlobalServices/commonfunctions.service';
import { UploadPreviewService }         from 'src/app/SharedComponentModules/upload-preview/upload-preview.service';
import { FetchService }                 from 'src/app/GlobalServices/fetch.service';

import { UploadPreviewSettings }        from 'src/app/SharedComponentModules/upload-preview/uploadpreviewclass';
import { GuildMetaData }                from 'src/app/Classes/ContentClasses';
import { CRUDdata }                     from 'src/app/Classes/ContentClasses';

@Component({
  selector: 'app-guildform',
  templateUrl: './guildform.component.html',
  styleUrls: ['../../Form.css']
})

export class GuildFormComponent implements OnInit, OnDestroy {
  
  Form: FormGroup;
  imageSettings = new UploadPreviewSettings([[undefined, undefined, '100MB'], [200, 600, '300KB']]);
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
  }

  createForm() {
    return this.fb.group({
      GuildName: '',
      ID: '',
      Master: '',
      Founded: '',
      Host: '',
      Description: '',
      History: '',
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
    const imageFile = this.uploadpreviewserv.mainsData[0];
    //Incomplete Form
    if(imageFile === undefined
      && this.Form.controls.Links.value === '') {
      return this.controller.activeFormData.next(
        new CRUDdata(true, 'Guild files require an insignia image.'));
    }
    
    //Complete Form
    const Final:GuildMetaData = Object.assign({}, this.Form.value);
    Final.ID = Final.GuildName.split(' ')[0];
    if(Final.ID === 'The') {
      Final.ID = 'DIA'
    }
    return this.controller.activeFormData.next(
      new CRUDdata(false, '', Final,
                  [`GuildInsig/${Final.ID}`],
                  [imageFile],
                  Final.Links));
  }

  onReset() {
    this.Form = this.createForm();
    this.controller.message.next('');
    this.uploadpreviewserv.reset.next();
    this.uploadpreviewserv.erase(0);
  }
}
