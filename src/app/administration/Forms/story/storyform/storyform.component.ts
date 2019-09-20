import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CRUDcontrollerService } from '../../../services/CRUDcontroller.service';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-storyform',
  templateUrl: './storyform.component.html',
  styleUrls: ['../../Form.css']
})

export class StoryFormComponent implements OnInit, OnDestroy {
  
  Form = this.createForm();
  stream1: Subscription;
  stream2: Subscription;

  editFormData:any;
  init = true;

  constructor(private controller: CRUDcontrollerService,
              private fb: FormBuilder) { }

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

  createForm(){
    return this.fb.group({
      Type: 'Narrative',
      Series: '',
      Title: '',
      Section: 0,
      Synopsis: '',
      Story: '',
      StoryLink: ''
    })
  }

  assignFormData() {
    if(this.editFormData){
      this.Form = this.controller.quickAssign(this.Form, this.editFormData);
      this.controller.getText(this.editFormData.StoryLink).subscribe( text =>
        this.Form.controls.Story.setValue(text) )
    }else if(!this.init){
      this.onReset()
    }
  }

  processForm() {
    let Final = this.Form.value;
    delete Final.Story;
    let oldText:string;
    if(this.editFormData){
      oldText = this.editFormData.StoryLink;
    }
    const text:string = this.Form.controls.Story.value;
    Final.WordCount = text.trim().split(/\s+/).length
    Final.ID = `${Final.Title.replace(/\s/g, "")}`
    // const seriesData = {ID: `${Final.Series.replace(/\s/g, "")}`,
    //                     Name: Final.Series}
    var newText = new Blob([text], {type: 'text/plain'});
    this.controller.activeFormData.next([Final,
      [],
      [],
      undefined,
      `${Final.Type}/${Final.ID}`,
      newText,
      oldText]);
      

      // return this.uploaderserv.uploadWriting(newStory, `${newStory.Type}s`, 
      //                                         newText,
      //                                         `${newStory.Type}s/${newStory.ID}`, seriesData)
      // const oldSeries = this.editStory.Series.split(' ').join('')
      // return this.uploaderserv.editWriting(newStory, `${newStory.Type}s`, newText, `${newStory.Type}s/${newStory.ID}`,
      //                                       seriesData, this.editStory, `${newStory.Type}s/${oldSeries}/${oldSeries}`)
  }

  onReset() {
    this.Form = this.createForm();
  }

}
