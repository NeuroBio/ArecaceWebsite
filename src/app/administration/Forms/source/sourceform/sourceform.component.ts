import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder }        from '@angular/forms';

import { CRUD } from '../../../CRUD.service'
import { EditService }  from '../../../edit.service'
import { Subscription } from 'rxjs';
import { Categories, Paths } from '../../../../Classes/categories'
import { FileHierarchy } from 'src/app/Classes/filehierarchy';

@Component({
  selector: 'app-sourceform',
  templateUrl: './sourceform.component.html',
  styleUrls: ['../../Form.css']
})
export class SourceFormComponent implements OnInit {
  
  @ViewChild('image') imageValue: ElementRef;
  stream:Subscription;
  stream2: Subscription;
  stream3: Subscription;
  allowDelete: boolean;
  allowEditAll: boolean;

  editSource:any;
  init:boolean = true;
  action:string ="Submit"
  imageEvent:any;
  cats = new Categories;
  pats = new Paths;
  categories:string[];
  docPath:string;
  imagePath:string;
  sourceForm = this.createForm();
  message:string;
  type:string;
  fileHierarchy = new FileHierarchy;

  constructor(private uploadserv:CRUD,
              private fb:FormBuilder,
              private editserv:EditService) { }

  ngOnInit() {
    this.editserv.itemType.subscribe(type =>{
      this.type = type;
      this.categories = this.cats[type]
      this.docPath = this.pats[type][0];
      this.imagePath = this.pats[type][1];
      this.sourceForm.controls.Category.patchValue(this.categories[0])
    }).unsubscribe();
    
    this.stream = this.editserv.itemToEdit.subscribe(item => {
      this.editSource=item;
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
    if(this.editSource){
      this.sourceForm = this.editserv.quickAssign(this.sourceForm, this.editSource);
      this.ResetFile();
      this.action = 'Accept Edits';
    }else if(!this.init){
      this.onReset()
    }
  }

  getImage(event:any){
    this.imageEvent = event;
  }

  onSubmit(){
    //Process for upload
    this.message = 'Processing Data...'
    const results = Object.assign({}, this.sourceForm.value);
    results.ID = this.sourceForm.controls.Topic.value.split(' ').join('');
    const newSource = results;
    if(!this.editSource){
      this.message = "Hold on, uploading!";
      return this.uploadserv.uploadImages([`${this.imagePath}/${newSource.ID}`], [this.imageEvent])
      .then(links => {
        newSource.Links = links;
        return this.uploadserv.uploadItem(newSource, this.docPath);
      }).then(() => {
          this.onReset();
          this.message="Successful upload!"
      });
    }else{
      this.message = "Hold on, editing!";
      return this.uploadserv.editImages([`${this.imagePath}/${newSource.ID}`], [this.imageEvent], this.editSource.Links)
      .then(links => {
        newSource.Links = links;
        return this.uploadserv.editItem(newSource, this.docPath, this.editSource.key);
      }).then(() => {
          this.editserv.itemToEdit.next(undefined);
          this.message="Successful edit!";
      });
    }
  }
  
  onDelete(){
    this.message = 'Hold on, deleting!'
    this.uploadserv.deleteItem(this.editSource.Links, this.docPath, this.editSource.key)
    .then(() => {
      this.editserv.itemToEdit.next(undefined);
      this.message = 'Successful Delete!';
    })
  }

  ResetFile(){
    this.imageEvent = undefined;
    this.imageValue.nativeElement.value = '';
  }

  onReset(){
    this.sourceForm = this.createForm();
    this.sourceForm.controls.Category.patchValue(this.categories[0])
    this.ResetFile();
    this.action = "Submit"
  }

  createForm(){
    return this.fb.group({
      ID: '',
      Category: '',
      Topic: '',
      Caption: '',
      FullText: '',
      Links: ''
    })
  }

  updateAll(){
    this.editserv.getEditableCollection(this.fileHierarchy[this.type].Path[0])
                  .subscribe(collect =>{
                    collect.forEach(member => {
                        this.editSource = member;
                        this.assignEdit();
                        this.onSubmit();  
      })
    })
  }
}
