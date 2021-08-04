import { Component, OnInit, OnDestroy} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CRUDcontrollerService } from '../../services/CRUDcontroller.service';
import { QuickAssign } from 'src/app/GlobalServices/commonfunctions.service';

import { Word, Nomadic, WordTypes } from '../../../Classes/NomadicLanguage';
import { CRUDdata } from 'src/app/Classes/ContentClasses';
@Component({
  selector: 'app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['../../Forms/Form.css', './word-form.component.css']
})
export class WordFormComponent implements OnInit, OnDestroy {

  Nomadic = new Nomadic();
  WordTypes = new WordTypes();
  Form: FormGroup;
  stream1: Subscription;
  stream2: Subscription;
  activeType: string;

  constructor(private fb: FormBuilder,
              private controller: CRUDcontrollerService,
              private qa: QuickAssign) { }

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
      Subtype: 'None',
      Level: 1,
      Core: '',
      Components: 'NA',
      ComponentWords: 'NA'
    });
  }

  assignFormData(editFormData: any) {
    this.onReset();
    if (editFormData) {
      this.Form = this.qa.assign(this.Form, editFormData);
    }
  }

  processForm() {
    // Incomplete Form
    if (!this.Form.valid) {
      return this.controller.activeFormData.next(
        new CRUDdata(true, 'All blanks must be filled.'));
    }
    // Complete Form   
    const Final:Word = Object.assign({}, this.Form.value);
    Final.ID = Final.Indativor;
    return this.controller.activeFormData.next(
      new CRUDdata(false, '', Final));
  }

  onReset() {
    this.Form = this.createForm();
    this.controller.message.next('');
  }

  assignGeneratedWord(word: any) {
    this.Form.patchValue({Indativor: word});
    this.updateCore();
  }

  updateType() {
    this.activeType = this.Form.controls.Type.value;
    this.updateCore();
  }

  updateCore() {
    const word = this.Form.controls.Indativor.value;
    const Core = this.Nomadic.getCore(word.split(''), this.Form.controls.Type.value).join('');
    this.Form.patchValue({Core: Core});
  }
}
