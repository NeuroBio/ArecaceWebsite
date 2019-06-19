import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { GuildMetaData } from 'src/app/Classes/guildmetadata';
import { CRUD } from '../../../CRUD.service';
import { EditService }      from '../../../edit.service';
import { Subscription } from 'rxjs';
import { FileHierarchy } from 'src/app/Classes/filehierarchy';

@Component({
  selector: 'app-guildform',
  templateUrl: './guildform.component.html',
  styleUrls: ['../../Form.css']
})

export class GuildFormComponent implements OnInit, OnDestroy {
  
  guildForm = this.createForm();
  @ViewChild('insig') Insig:ElementRef;
  insigniaFile:any;
  message:string = '';
  stream: Subscription;
  stream2: Subscription;
  stream3: Subscription;
  allowDelete: boolean;
  allowEditAll: boolean;

  editGuild:any;
  action:string='Submit';
  init:boolean=true;
  fileHierarchy = new FileHierarchy;

  constructor(private fb: FormBuilder,
              private uploadserv: CRUD,
              private editserv: EditService) { }

  ngOnInit() {
    this.stream = this.editserv.itemToEdit.subscribe(item => {
      this.editGuild=item;
      this.assignEdit();
      this.init = false
    })
    this.stream2 = this.editserv.allowDelete.subscribe(bool => this.allowDelete = bool);
    this.stream3 = this.editserv.allowEditAll.subscribe(bool => this.allowEditAll = bool);
  }

  ngOnDestroy(){
    this.stream.unsubscribe()
    this.stream2.unsubscribe()
    this.stream3.unsubscribe()
  }

  assignEdit(){
    if(this.editGuild){
      this.guildForm = this.editserv.quickAssign(this.guildForm, this.editGuild)
      this.resetFile();
      this.action = "Accept Edits"
    }else if(!this.init){
      this.onReset()
    }
  }

  onFile(event:any){
    this.insigniaFile = event;
  }

  createForm(){
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
    })
  }

  onSubmit(){
    let newGuild:GuildMetaData = this.guildForm.value;
    newGuild.ID = newGuild.GuildName.split(' ')[0];
    if(newGuild.ID === 'The'){
      newGuild.ID = 'DIA'
    } 
    if(!this.editGuild){
      this.message = "Hold on, uploading!";
      return this.uploadserv.uploadImages([`GuildInsig/${newGuild.ID}`], [this.insigniaFile])
      .then(links => {
        newGuild.Links = links;
        return this.uploadserv.uploadItem(newGuild,'Guilds');
      }).then(() => {
          this.onReset();
          this.message="Successful upload!"
      });
    }else{
      this.message = "Hold on, editing!";
      return this.uploadserv.editImages([`GuildInsig/${newGuild.ID}`], [this.insigniaFile], this.editGuild.Links)
      .then(links => {
        newGuild.Links = links;
        return this.uploadserv.editItem(newGuild,'Guilds', this.editGuild.key);
      }).then(() => {
          this.editserv.itemToEdit.next(undefined);
          this.message="Successful edit!";
      });
    }
  }
  
  onDelete(){
    this.message = 'Hold on, deleting!'
    this.uploadserv.deleteItem(this.editGuild.Links, 'Guilds', this.editGuild.key)
    .then(() => {
      this.editserv.itemToEdit.next(undefined);
      this.message = 'Successful Delete!';
    })
  }
  resetFile(){
    this.Insig.nativeElement.value = '';
    this.insigniaFile = undefined;
  }
  onReset(){
    this.guildForm = this.createForm();
    this.resetFile();
    this.action='Submit';
  }

  updateAll(){
    this.editserv.getEditableCollection(this.fileHierarchy.guilds.Path[0])
                  .subscribe(collect =>{
                    collect.forEach(member => {
                        this.editGuild = member;
                        this.assignEdit();
                        this.onSubmit();  
      })
    })
  }

}
