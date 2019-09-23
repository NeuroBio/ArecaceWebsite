import { Component, OnInit, ViewChild,
         OnDestroy, ElementRef }        from '@angular/core';
import { FormBuilder }                  from '@angular/forms';
import { Subscription }                 from 'rxjs';

import { GuildMetaData }                from 'src/app/Classes/guildmetadata';
import { CRUDcontrollerService }        from '../../../services/CRUDcontroller.service';

@Component({
  selector: 'app-guildform',
  templateUrl: './guildform.component.html',
  styleUrls: ['../../Form.css']
})

export class GuildFormComponent implements OnInit, OnDestroy {
  
  Form = this.createForm();
  @ViewChild('insig') imageUploader: ElementRef;
  imageFile: any;

  stream1: Subscription;
  stream2: Subscription;
  editFormData: any;
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

  assignFormData() {
    if(this.editFormData){
      this.onReset();
      this.Form = this.controller.quickAssign(this.Form, this.editFormData);
    }else if(!this.init){
      this.onReset();
    }
  }

  processForm() {
    //Incomplete Form
    if(this.imageFile === undefined
      && this.Form.controls.Links.value === '') {
      this.controller.activeFormData.next(["abort",
        "Guild files require an insignia image."]);
      return ;
    }
    
    //Complete Form
    const Final:GuildMetaData = Object.assign({}, this.Form.value);
    Final.ID = Final.GuildName.split(' ')[0];
    if(Final.ID === 'The'){
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
