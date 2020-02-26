import { Component, OnInit, ViewChild,
         OnDestroy, ElementRef }        from '@angular/core';
import { FormBuilder, FormGroup }       from '@angular/forms';
import { Subscription }                 from 'rxjs';

import { GuildMetaData }                from 'src/app/Classes/ContentClasses';
import { CRUDcontrollerService }        from '../../../services/CRUDcontroller.service';

@Component({
  selector: 'app-guildform',
  templateUrl: './guildform.component.html',
  styleUrls: ['../../Form.css']
})

export class GuildFormComponent implements OnInit, OnDestroy {
  
  Form: FormGroup;
  @ViewChild('insig', { static: true }) imageUploader: ElementRef;
  imageFile: any;

  stream1: Subscription;
  stream2: Subscription;

  constructor(private fb: FormBuilder,
              private controller: CRUDcontrollerService) { }

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
      this.Form = this.controller.quickAssign(this.Form, editFormData);
    }
  }

  processForm() {
    //Incomplete Form
    if(this.imageFile === undefined
      && this.Form.controls.Links.value === '') {
      this.controller.activeFormData.next(["abort",
        "Guild files require an insignia image."]);
      return;
    }
    
    //Complete Form
    const Final:GuildMetaData = Object.assign({}, this.Form.value);
    Final.ID = Final.GuildName.split(' ')[0];
    if(Final.ID === 'The') {
      Final.ID = 'DIA'
    }
    this.controller.activeFormData.next([Final,
                                      [`GuildInsig/${Final.ID}`],
                                      [this.imageFile],
                                      Final.Links,
                                      undefined,
                                      undefined,
                                      undefined]);
  }

  onFile(event:any) {
    this.imageFile = event;
  }

  onReset() {
    this.Form = this.createForm();
    this.imageUploader.nativeElement.value = '';
    this.imageFile = undefined;
    this.controller.message.next('');
  }
}
