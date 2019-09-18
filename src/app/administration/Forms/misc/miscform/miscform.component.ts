import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Validators, FormBuilder }        from '@angular/forms';
import { ViewChild } from '@angular/core'

import { CRUD } from '../../../services/CRUD.service'
import { EditService }  from '../../../services/edit.service'

import { Subscription } from 'rxjs';
import { ExtrasMetaData } from 'src/app/Classes/extrasmetadata';
import { FileHierarchy } from 'src/app/Classes/filehierarchy';

@Component({
  selector: 'app-miscform',
  templateUrl: './miscform.component.html',
  styleUrls: ['../../Form.css']
})
export class MiscFormComponent implements OnInit, OnDestroy {

  init:boolean = true;
  message:string='';
  editMisc:any;
  action:string = 'Submit';
  stream: Subscription;
  stream2: Subscription;
  stream3: Subscription;
  allowDelete: boolean;
  allowEditAll: boolean;


  miscForm = this.createForm();
  @ViewChild('Thumb') thumbValue: ElementRef;
  @ViewChild('Full') fullValue: ElementRef;
  thumbEvent:any;
  fullEvent:any;
  fileHierarchy = new FileHierarchy;

  constructor(private uploadserv:CRUD,
              private fb:FormBuilder,
              private editserv:EditService) { }

  ngOnInit() {
    this.stream = this.editserv.itemToEdit.subscribe(item => {
      this.editMisc=item;
      this.assignEdit();
      this.init = false
    });
    this.stream2 = this.editserv.allowDelete.subscribe(bool => this.allowDelete = bool);
    this.stream3 = this.editserv.allowEditAll.subscribe(bool => this.allowEditAll = bool);
  }

  ngOnDestroy(){
    this.stream.unsubscribe()
    this.stream2.unsubscribe()
    this.stream3.unsubscribe()
  }

  
  assignEdit(){
    if(this.editMisc){
      this.miscForm = this.editserv.quickAssign(this.miscForm, this.editMisc);
      this.resetFileUpload()
      this.action = 'Accept Edits';
    }else if(!this.init){
      this.onReset()
    }
  }

  getThumb(event:any){
    this.thumbEvent = event;
  }
  getFull(event:any){
    this.fullEvent = event;
  }


  //Upload/Edit/Delete logic
  onSubmit(){
  //Process for upload
    this.message = 'Processing Data...'
    const results = Object.assign({}, this.miscForm.value);
    results.ID = this.miscForm.controls.Name.value.split(' ').join('');
    const newMisc:ExtrasMetaData = results;

    const imagePaths = [`MiscArt/${newMisc.ID}-thumb`,
                        `MiscArt/${newMisc.ID}-full`];
    const images = [this.thumbEvent, this.fullEvent];

    if(!this.editMisc){
      this.message = "Hold on, uploading!";
      return this.uploadserv.uploadImages(imagePaths, images)
      .then(links => {
        newMisc.Links = links;
        return this.uploadserv.uploadItem(newMisc,'MiscArt');
      }).then(() => {
          this.onReset();
          this.message="Successful upload!"
      });
    }else{
      this.message = "Hold on, editing!";
      return this.uploadserv.editImages(imagePaths, images, this.editMisc.Links)
      .then(links => {
        newMisc.Links = links;
        return this.uploadserv.editItem(newMisc,'MiscArt', this.editMisc.key);
      }).then(() => {
          this.editserv.itemToEdit.next(undefined);
          this.message="Successful edit!";
      });
    }
  }

  onDelete(){
    this.message = 'Hold on, deleting!'
    this.uploadserv.deleteItem(this.editMisc.Links, 'MiscArt', this.editMisc.key)
    .then(() => {
      this.editserv.itemToEdit.next(undefined);
      this.message = 'Successful Delete!';
    })
  }
  
  resetFileUpload(){
    this.thumbEvent=undefined;
    this.fullEvent=undefined;
    this.thumbValue.nativeElement.value='';
    this.fullValue.nativeElement.value='';
  }

  onReset(){
    this.miscForm = this.createForm();
    this.resetFileUpload()
    this.action = 'Submit';
  }

  updateAll(){
    this.editserv.getEditableCollection(this.fileHierarchy.extras.Path[0])
                  .subscribe(collect =>{
                    collect.forEach(member => {
                        this.editMisc = member;
                        this.assignEdit();
                        this.onSubmit();  
      })
    })
  }

  createForm(){
    return this.fb.group({
        Name:'',
        Links: '',
        Description:'',
        Date:''
    })
  }
}
