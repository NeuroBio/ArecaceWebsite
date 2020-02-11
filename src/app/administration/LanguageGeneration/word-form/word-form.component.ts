import { Component, OnInit,
  OnDestroy, ElementRef }                  from '@angular/core';
import { Validators, FormBuilder, FormGroup }     from '@angular/forms';
import { Subscription }                           from 'rxjs';

import { CRUDcontrollerService }       from '../../services/CRUDcontroller.service'
import { Word, Nomadic } from '../rules';

@Component({
  selector: 'app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['../../Forms/Form.css', './word-form.component.css']
})
export class WordFormComponent implements OnInit, OnDestroy {

  Nomadic = new Nomadic();
  Form: FormGroup
  stream1: Subscription;
  stream2: Subscription;
  activeType: string;
  
  constructor(private fb: FormBuilder,
              private controller: CRUDcontrollerService) { }

  ngOnInit() {
    this.stream1 = this.controller.itemToEdit
      .subscribe(item => this.assignFormData(item));
    this.stream2 = this.controller.triggerProcess
      .subscribe(() => this.processForm());
    this.updateType();
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
  }

  createForm() {
    return this.fb.group({
      Indativor: ['', Validators.required],
      English: ['', Validators.required],
      Type: 'Noun',
      Level: 1,
      Core: '',
      Components: 'NA'
    });
  }

  assignFormData(editFormData: any) {
    this.onReset();
    if(editFormData) {
      this.Form = this.controller.quickAssign(this.Form, editFormData);
    }
  }

  processForm() {
    //Incomplete Form
    if(!this.Form.valid) {
      this.controller.activeFormData.next(["abort", "All blanks must be filled."]);
      return ;
    }
    //Complete Form   
    const Final:Word = Object.assign({}, this.Form.value);
    this.controller.activeFormData.next([Final,
                                      [],
                                      [],
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined]);
  }
  
  onReset() {
    this.Form = this.createForm();
    this.controller.message.next('');
  }

  assignGeneratedWord(word: any) {
    const Core = this.Nomadic.getCore(word.split(''), this.Form.controls.Type.value);
    this.Form.patchValue({Indativor: word, Core: Core});
  }

  updateType() {
    let currentType = this.Form.controls.Type.value;
    if(currentType === 'Misc') {
      currentType = 'Noun'
    }
    this.activeType = currentType;
  }
}
