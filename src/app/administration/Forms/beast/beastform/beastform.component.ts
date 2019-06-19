import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Validators, FormBuilder }        from '@angular/forms';
import { ViewChild } from '@angular/core'

import { CRUD } from '../../../CRUD.service'
import { EditService }  from '../../../edit.service'

import { BestDropDowns } from '../bestdropdowns'
import { BeastMetaData } from 'src/app/Classes/beastmetadata';
import { Subscription } from 'rxjs';
import { FileHierarchy } from 'src/app/Classes/filehierarchy';

@Component({
  selector: 'app-beastform',
  templateUrl: './beastform.component.html',
  styleUrls: ['../../Form.css']
})
export class BeastFormComponent implements OnInit, OnDestroy {

  init:boolean = true;
  message:string='';
  dropDowns = new BestDropDowns();
  editBeast:any;
  action:string = 'Submit';
  stream: Subscription;
  stream2: Subscription;
  stream3: Subscription;
  allowDelete: boolean;
  allowEditAll: boolean;

  beastForm = this.createForm();
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
      this.editBeast=item;
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
    if(this.editBeast){
      this.beastForm = this.editserv.quickAssign(this.beastForm, this.editBeast);
      if(this.editBeast.BeastName){
        this.beastForm.controls.Name.patchValue(this.editBeast.BeastName);
      }
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

  onSubmit(){
    this.message = 'Processing Data...'
    const results = Object.assign({}, this.beastForm.value);
    results.ID = this.beastForm.controls.Name.value.split(' ').join('');
    const newBeast:BeastMetaData = results;

    const imagePaths = [`Bestiary/${newBeast.ID}-thumb`,
                        `Bestiary/${newBeast.ID}-full`];
    const images = [this.thumbEvent, this.fullEvent];

    if(!this.editBeast){
      this.message = "Hold on, uploading!";
      return this.uploadserv.uploadImages(imagePaths, images)
      .then(links => {
        newBeast.Links = links;
        return this.uploadserv.uploadItem(newBeast,'Bestiary');
      }).then(() => {
          this.onReset();
          this.message="Successful upload!"
      });
    }else{
      this.message = "Hold on, editing!";
      return this.uploadserv.editImages(imagePaths, images, this.editBeast.Links)
      .then(links => {
        newBeast.Links = links;
        return this.uploadserv.editItem(newBeast,'Bestiary', this.editBeast.key);
      }).then(() => {
          this.editserv.itemToEdit.next(undefined);
          this.message="Successful edit!";
      });
    }
  }
  
  onDelete(){
    const pics:string[] = this.editBeast.Links;                             
    this.message = 'Hold on, deleting!'
    this.uploadserv.deleteItem(pics, 'Bestiary', this.editBeast.key)
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
    this.beastForm = this.createForm();
    this.resetFileUpload()
    this.action = 'Submit';
  }


  updateAll(){
    this.editserv.getEditableCollection(this.fileHierarchy.bestiary.Path[0])
                  .subscribe(collect =>{
                    collect.forEach(member => {
                        this.editBeast = member;
                        this.assignEdit();
                        this.onSubmit();  
      })
    })
  }


  createForm(){
    return this.fb.group({
      Name: ['', Validators.required],
      Phylo: 'Mammalia',
      Region: 'Escholzia',    
      Biome: 'Plains',
      Links: '',
      AltText: ''
    })
  }
}
