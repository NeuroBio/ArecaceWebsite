import { Component, OnInit, OnDestroy }     from '@angular/core';
import { FormBuilder, FormGroup }           from '@angular/forms';

import { Subscription }                     from 'rxjs';

import { CRUDcontrollerService }            from '../../../services/CRUDcontroller.service';
import { QuickAssign }                      from 'src/app/GlobalServices/commonfunctions.service';

import { CRUDdata }                         from 'src/app/Classes/ContentClasses';

@Component({
  selector: 'app-storyform',
  templateUrl: './storyform.component.html',
  styleUrls: ['../../Form.css']
})

export class StoryFormComponent implements OnInit, OnDestroy {
  
  Form: FormGroup;
  stream1: Subscription;
  stream2: Subscription;

  oldText: string;
  type: string;

  constructor(private controller: CRUDcontrollerService,
              private fb: FormBuilder,
              private qa: QuickAssign) { }

  ngOnInit() {
    this.stream1 = this.controller.itemToEdit
      .subscribe(item => this.assignFormData(item));
    this.stream2 = this.controller.triggerProcess
      .subscribe(() => this.processForm());
    this.controller.itemType.subscribe(type => 
      this.type = type).unsubscribe();
  }
  
  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.controller.disposal();
  }

  createForm() {
    return this.fb.group({
      Type: '',
      Series: '',
      Title: '',
      Section: 0,
      Synopsis: '',
      Story: '',
      StoryLink: ''
    })
  }

  assignFormData(editFormData: any) {
    this.onReset();
    if(editFormData) {
      this.Form = this.qa.assign(this.Form, editFormData);
      this.controller.getText(editFormData.StoryLink).subscribe( text =>
        this.Form.controls.Story.setValue(text) );
        this.oldText = editFormData.StoryLink;
    }
  }

  processForm() {
    let Final = Object.assign({}, this.Form.value);
    delete Final.Story;
    Final.type = this.type;
    
    let oldText: string;
    if(this.oldText){
      oldText = this.oldText;
    }
    const text: string = this.Form.controls.Story.value;
    
    Final.WordCount = text.trim().split(/\s+/).length;
    Final.ID = `${Final.Title.replace(/\s/g, "")}`;
    var newText = new Blob([text], {type: 'text/plain'});
    
    return this.controller.activeFormData.next(
      new CRUDdata(false, '', Final,
                  undefined, undefined, undefined,
                  `${Final.Type}/${Final.ID}`,
                  newText,
                  oldText));
  }

  onReset() {
    this.Form = this.createForm();
    this.oldText = undefined;
  }

}
