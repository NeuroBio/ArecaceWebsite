import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CRUDcontrollerService } from 'src/app/administration/services/CRUDcontroller.service';
import { formatDate } from '@angular/common';
import { PostData } from 'src/app/Classes/postdata';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['../../Form.css']
})

export class UpdateFormComponent implements OnInit, OnDestroy {

  Form = this.createForm();
  @ViewChild('Image') imageUploader:ElementRef;
  imageFile:any;
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
  
  ngOnDestroy(){
    this.stream1.unsubscribe()
    this.stream2.unsubscribe()
  }

  createForm(){
    return this.fb.group({
      Poster: 'kArA',
      Body: '',
      AltText: '',
      Links: '',
      Date: '',
      Time: '',
      Edited: false
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
    const Final: PostData = this.Form.value;
    let oldImages: string[] = [];
    let newImages: any[] = []
    if(!this.editFormData) {
      console.log("in")
      Final.Date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      Final.Time = formatDate(new Date(), 'HH:mm', 'en');
      Final.ID = `${Final.Date}, ${Final.Time}`;
    }else{
      Final.Date = this.editFormData.Date;
      Final.Time = this.editFormData.Time;
      Final.ID = this.editFormData.ID;
      Final.Edited = true;
      if(this.editFormData.Links){
        oldImages = this.editFormData.Links;
      }
    }

    if(this.imageFile){
      newImages = [this.imageFile];
    }

    this.controller.activeFormData.next([Final,
                                        [`Inanity/${Final.ID}`],
                                        newImages,
                                        oldImages,
                                        undefined,
                                        undefined,
                                        undefined]);
  }

  onReset(){
    this.Form = this.createForm();
    this.imageUploader.nativeElement.value = '';
    this.imageFile = undefined;
  }

  onFile(event:any) {
    this.imageFile = event;
  }
}
