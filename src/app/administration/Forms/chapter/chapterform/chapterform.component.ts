import { Component, OnInit, OnDestroy, ViewChild, ElementRef, QueryList, ViewChildren }                          from '@angular/core';
import { FormControl, FormArray,FormBuilder } from '@angular/forms';
import { ChapterMetaData }                    from 'src/app/Classes/chaptermetadata'
import { CRUD }                    from '../../../CRUD.service'
import { EditService }      from '../../../edit.service';
import { Subscription } from 'rxjs';
import { FileHierarchy } from 'src/app/Classes/filehierarchy';

@Component({
  selector: 'app-chapterform',
  templateUrl: './chapterform.component.html',
  styleUrls: ['../../Form.css']
})
export class ChapterFormComponent implements OnInit, OnDestroy{

  chapterForm = this.createForm()
  pageLinks:any[] = new Array(10);
  dummy = new Array(10) 
  Arcs = [1,2,3,4, "WRC", "LW", 7, "Dae"]
  message:string = '';
  action:string="Submit"
  editChapter:any;
  edit:boolean = false;
  stream:Subscription;
  stream2: Subscription;
  stream3: Subscription;
  allowDelete: boolean;
  allowEditAll: boolean;

  init:boolean=true;
  @ViewChild('form') form:ElementRef;
  fileHierarchy = new FileHierarchy;

  constructor(private fb:FormBuilder,
              private uploadserv:CRUD,
              private editserv:EditService) { }
  
  ngOnInit(){
    this.stream = this.editserv.itemToEdit.subscribe(item => {
      this.editChapter=item;
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
    if(this.editChapter){
      this.chapterForm = this.editserv.quickAssign(this.chapterForm, this.editChapter)
      this.action = "Accept Edits"
      this.pageLinks = Array.apply(null, Array(this.editChapter.Links.length)).map(function () {})
      this.dummy = new Array(this.pageLinks.length)
      this.edit = true;
    }else if(!this.init){
      this.onReset()
    }
  }    


  addPage(add:boolean){
    if(add){
      this.pageLinks.push('');
      this.dummy.push('');
    }else{
      this.pageLinks.pop();
      this.dummy.pop();
    }
  }

  updatePage(ind:number,event:any){
    this.pageLinks[ind] = event;
  }

  getPageNames(pages:any[], newChap:any){
    let pageNames:string[]=[];
    for(let i = 0; i< pages.length; i++){
      pageNames.push(`ComicPages/Arc${newChap.Arc}/${newChap.ID}-${i}`);
    }
    return(pageNames);
  }

  
  onSubmit(){
    this.message = 'Processing Data...'
    const newChap = this.chapterForm.value;
    newChap.NumPages = this.pageLinks.length;
    const pageNames:string[] = this.getPageNames(this.pageLinks, newChap);

    if(!this.editChapter){
      this.message = "Hold on, uploading!";
      return this.uploadserv.uploadImages(pageNames, this.pageLinks)
      .then(links => {
        newChap.Links = links;
        return this.uploadserv.uploadItem(newChap,`Arc${newChap.Arc}Data`);
      }).then(() => {
          this.onReset();
          this.message="Successful upload!"
      });
    }else{
      this.message = "Hold on, editing!";
      return this.uploadserv.editImages(pageNames, this.pageLinks, this.editChapter.Links)
      .then(links => {
        newChap.Links = links;
        return this.uploadserv.editItem(newChap,`Arc${newChap.Arc}Data`, this.editChapter.key);
      }).then(() => {
          this.editserv.itemToEdit.next(undefined);
          this.message="Successful edit!";
      });
    }
  }
  
  onDelete(){
    this.message = 'Hold on, deleting!'
    this.uploadserv.deleteItem(this.editChapter.Links, `Arc${this.editChapter.Arc}Data`, this.editChapter.key)
    .then(() => {
      this.editserv.itemToEdit.next(undefined);
      this.message = 'Successful Delete!';
    })
  }

  onReset(){
      this.form.nativeElement.reset();
      this.chapterForm = this.createForm();
      this.pageLinks = new Array(10);
      this.action = "Submit";
      this.dummy = new Array(10);
      this.edit = false;
  }

  updateAll(){
    this.editserv.getEditableCollection(this.fileHierarchy.chapter.Path[0])
                  .subscribe(collect =>{
                    collect.forEach(member => {
                        this.editChapter = member;
                        this.assignEdit();
                        this.onSubmit();  
      })
    })
  }

  createForm(){
    return this.fb.group({
      Name: '',
      ID: '',
      Index:'',
      Arc: 1,
      Message: '',
      Links: ''
    })
  }
}
