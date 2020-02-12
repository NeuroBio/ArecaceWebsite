import { Component, OnInit, OnDestroy}                  from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray }     from '@angular/forms';
import { Subscription }                           from 'rxjs';

import { CRUDcontrollerService }       from '../../services/CRUDcontroller.service'
import { Word, Nomadic, CompWord } from '../rules';

@Component({
  selector: 'app-complex-word-form',
  templateUrl: './complex-word-form.component.html',
  styleUrls: ['../../Forms/Form.css', './complex-word-form.component.css']
})
export class ComplexWordFormComponent implements OnInit, OnDestroy {

  Nomadic = new Nomadic();
  Form: FormGroup
  stream1: Subscription;
  stream2: Subscription;
  stream3: Subscription;
  WordArray: FormArray;
  SortedDictionary: {};
  allowDelete: boolean;
  
  constructor(private fb: FormBuilder,
              private controller: CRUDcontrollerService) { }

  ngOnInit() {
    this.stream1 = this.controller.itemToEdit
      .subscribe(item => this.assignFormData(item));
    this.stream2 = this.controller.triggerProcess
      .subscribe(() => this.processForm());
    this.stream3 = this.controller.itemList.subscribe(list =>
      this.SortedDictionary = this.Nomadic.filterByType(list));
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.stream3.unsubscribe();
  }

  createForm() {
    return this.fb.group({
      Indativor: '',
      English: ['', Validators.required],
      Type: '',
      Level: '',
      Core: 'NA',
      Components: '',
      ComponentWords: this.WordArray
    });
  }

  assignFormData(editFormData: any) {
    this.onReset();
    if(editFormData) {
      this.Form = this.controller.quickAssign(this.Form, editFormData);
      const compwords = <CompWord[]>JSON.parse(editFormData.ComponentWords);
      compwords.forEach(word => 
        this.addWord(true, word.Type, word.Word));
    } else {
      this.addWord(true);
      this.addWord(true);
    }
    this.allowDelete = this.Form.controls.ComponentWords.value.length > 2
  }

  processForm() {
    //Incomplete Form
    if(!this.Form.valid) {
      this.controller.activeFormData.next(["abort", "All blanks must be filled."]);
      return ;
    }
    //Complete Form   
    const Final:Word = Object.assign({}, this.Form.value);
    console.log(Final.ComponentWords)
    Final.ComponentWords = JSON.stringify(Final.ComponentWords); 
    this.controller.activeFormData.next([Final,
                                      [],
                                      [],
                                      undefined,
                                      undefined,
                                      undefined,
                                      undefined]);
  }
  
  onReset() {
    this.WordArray = this.fb.array([]);
    this.Form = this.createForm();
    this.controller.message.next('');
  }

  pickWord() {
    try {
      let Components = [];
      let Levels = [];
      const Words = this.Form.controls.ComponentWords.value;
      Words.forEach((word, i) => {
        Components[i] = word.Word;
        const index = this.SortedDictionary[word.Type].map(word =>
          word.Indativor).indexOf(word.Word);
        Levels[i] = this.SortedDictionary[word.Type][index].Level;
      });
      const newWord = this.Nomadic.concatinateWords(Words, this.Form.controls.Type.value);
      const Type = Words[Words.length-1].Type;
      Components.join(';');
      Levels = Levels.reduce((a,b) => +a + +b, 0);
      this.Form.patchValue({Indativor: newWord, Level: Levels,
                            Components: Components, Type: Type});
    } catch {}
  }

  addWord(add: boolean, type: string = 'Noun', word: string = '') {
    if(add) {
      (<FormArray>this.Form.controls.ComponentWords)
      .push(this.fb.group({Type: type, Word: word}));
    } else {
      (<FormArray>this.Form.controls.ComponentWords)
      .removeAt(this.Form.controls.ComponentWords.value.length-1);
    }
    this.allowDelete = this.Form.controls.ComponentWords.value.length > 2
  }

}
