import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CRUDcontrollerService } from 'src/app/administration/services/CRUDcontroller.service';
import { CRUD } from 'src/app/administration/services/CRUD.service';
import { formatDate } from '@angular/common';
import { PostData } from 'src/app/Classes/postdata';
import { FileHierarchy } from 'src/app/Classes/filehierarchy';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['../../Form.css']
})
export class UpdateFormComponent implements OnInit, OnDestroy {

  message:string;
  action:string = "Submit";
  updateForm = this.createForm();
  editUpdate: any;
  init:boolean = true;
  @ViewChild('Image') image:ElementRef;
  imageFile:any;
  fileHierarchy = new FileHierarchy;
  stream: Subscription;
  stream2: Subscription;
  stream3: Subscription;
  allowDelete: boolean;
  allowEditAll: boolean;


  constructor(private fb: FormBuilder,
              private editserv: CRUDcontrollerService,
              private uploadserv: CRUD) { }

  ngOnInit() {
    this.stream = this.editserv.itemToEdit.subscribe(edit =>{
      this.editUpdate = edit;
      this.assignEdit();
      this.init = false;
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
    if(this.editUpdate){
      this.updateForm = this.editserv.quickAssign(this.updateForm, this.editUpdate);
      this.action = 'Accept Edits';
      this.resetFile();
    }else if(!this.init){
      this.onReset()
    }
  }

  onFile(event:any){
    this.imageFile = event;
  }

  onSubmit(){
  //Process for upload
    this.message = 'Processing Data...'
    const results = Object.assign({}, this.updateForm.value);
    
    const image = [this.imageFile];

  //New Upload
    if(!this.editUpdate){
      results.Date = formatDate(new Date(), 'yyyy-MM-dd', 'en')
      results.Time = formatDate(new Date(), 'HH:mm', 'en')
      results.ID = `${results.Date}, ${results.Time}`
      const newUpdate:PostData = results;

      this.message = 'Hold on, uploading!'
      return this.uploadserv.uploadImages([`Inanity/${newUpdate.ID}`], image)
      .then(links => {
        if(links[0]){newUpdate.Links = links;}
        return this.uploadserv.uploadItem(newUpdate,'Inanity');
      }).then(() => {
          this.onReset();
          this.message="Successful upload!"
      });
    }else{
        results.Date = this.editUpdate.Date;
        results.Time = this.editUpdate.Time
        results.ID = this.editUpdate.ID;
        const newUpdate:PostData = results;
        let oldImages:string[];

        if(!this.editUpdate.Links){
           oldImages = [];
        }else{
           oldImages = this.editUpdate.Links;
        }
        this.message = 'Hold on, editing!';
        return this.uploadserv.editImages([`Inanity/${newUpdate.ID}`], image, oldImages)
        .then(links => {
          if(links[0]){newUpdate.Links = links;}
          return this.uploadserv.editItem(newUpdate,'Inanity', this.editUpdate.key);
        }).then(() => {
            this.editserv.itemToEdit.next(undefined);
            this.message="Successful edit!";
        });
      //   return this.uploaderserv.editItem(newUpdate, 'Inanity', [`Inanity/${newUpdate.ID}`],
      //                                       image, oldImages, this.editUpdate.key)
      //   .then(() => {
      //     this.editserv.itemToEdit.next(undefined);
      //     this.message = 'Successful Edit!';
      // });
    }
  }
  
  onDelete(){                             
    this.message = 'Hold on, deleting!'
    this.uploadserv.deleteItem([], 'Inanity', this.editUpdate.key)
    .then(() => {
      this.editserv.itemToEdit.next(undefined);
      this.message = 'Successful Delete!';
    })
  }

  resetFile(){
    this.image.nativeElement.value = '';
    this.imageFile = undefined;
  }
  onReset(){
    this.updateForm = this.createForm();
    this.resetFile();
    this.action = "Submit";
  }

  createForm(){
    return this.fb.group({
      Poster: 'kArA',
      Body: '',
      AltText: ''
    })
  }

  updateAll(){
    this.editserv.getEditableCollection(this.fileHierarchy.update.Path[0])
                  .subscribe(collect =>{
                    collect.forEach(member => {
                        this.editUpdate = member;
                        this.assignEdit();
                        this.onSubmit();  
      })
    })
  }
}
