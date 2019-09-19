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
  
  guildForm = this.createForm();
  @ViewChild('insig') Insig: ElementRef;
  insigniaFile: any;
  stream1: Subscription;
  stream2: Subscription;
  editFormData: any;
  init = true;

  constructor(private fb: FormBuilder,
              private editserv: CRUDcontrollerService) { }

  ngOnInit() {
    this.stream1 = this.editserv.itemToEdit.subscribe(item => {
      this.editFormData=item;
      this.assignFormData();
      this.init = false;
    });
    this.stream2 =this.editserv.triggerProcess.subscribe(() => this.processForm());
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
      this.guildForm = this.editserv.quickAssign(this.guildForm, this.editFormData);
    }else if(!this.init){
      this.onReset();
    }
  }

  processForm() {
    //Incomplete Form
    // if(this.insigniaFile === undefined &&
    //     this.guildForm.controls.Links.value === '') {
    //   this.editserv.activeFormData.next("abort");
    //   return ;
    // }
    
    //Complete Form
    const Guild:GuildMetaData = this.guildForm.value;
    Guild.ID = Guild.GuildName.split(' ')[0];
    if(Guild.ID === 'The'){
      Guild.ID = 'DIA'
    }
    this.editserv.activeFormData.next([Guild,
                                      [`GuildInsig/${Guild.ID}`],
                                      [this.insigniaFile],
                                      Guild.Links,
                                      undefined,
                                      undefined,
                                      undefined]);
  }

  onFile(event:any) {
    this.insigniaFile = event;
  }

  resetFile() {
    this.Insig.nativeElement.value = '';
    this.insigniaFile = undefined;
  }

  onReset() {
    this.guildForm = this.createForm();
    this.resetFile();
    this.editserv.message.next('');
  }
}
