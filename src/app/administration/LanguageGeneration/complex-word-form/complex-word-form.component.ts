import { Component, OnInit, OnDestroy}                  from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray }     from '@angular/forms';
import { Subscription }                           from 'rxjs';

import { CRUDcontrollerService }       from '../../services/CRUDcontroller.service'
import { Word, Nomadic, CompWord, WordTypes } from '../../../Classes/NomadicLanguage';

@Component({
  selector: 'app-complex-word-form',
  templateUrl: './complex-word-form.component.html',
  styleUrls: ['../../Forms/Form.css', './complex-word-form.component.css']
})
export class ComplexWordFormComponent implements OnInit, OnDestroy {

  Nomadic = new Nomadic();
  WordTypes = new WordTypes();
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
    this.stream1 = this.controller.itemList.subscribe(list =>
      this.SortedDictionary = this.Nomadic.filterByType(list));
    this.stream2 = this.controller.itemToEdit
      .subscribe(item => this.assignFormData(item));
    this.stream3 = this.controller.triggerProcess
      .subscribe(() => this.processForm());
   
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
      Subtype: 'None',
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
        this.addWord(true, word.Type, word.Word, word.Core));
    } else {
      this.addWord(true);
      this.addWord(true);
      this.pickType('Noun', 0);
      this.pickType('Noun', 1);
      this.pickWord();
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
    Final.Components = this.Form.controls.ComponentWords.value.map(word => word.Word).join(';');
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

  pickType(type: string, index: number) {
    (<FormArray>this.Form.controls.ComponentWords).at(index)
    .patchValue({Word: this.SortedDictionary[type][0].Indativor});
    this.handleModifiers();
  }

  pickWord() {
      let Components = [];
      let Levels = [];
      const Words = this.Form.controls.ComponentWords.value;
      Words.forEach((word, i) => {
        if(word.Core){
          Components[i] = word.Word.split('').splice(0,word.Word.length-2).join('');
        }else {
          Components[i] = word.Word;
        }
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
    this.handleModifiers();
  }

  addWord(add: boolean, type: string = 'Noun', word: string = '', core: boolean = false) {
    if(add) {
      (<FormArray>this.Form.controls.ComponentWords)
      .push(this.fb.group({Type: type, Word: word, Core: core}));
    } else {
      (<FormArray>this.Form.controls.ComponentWords)
      .removeAt(this.Form.controls.ComponentWords.value.length-1);
    }
    this.allowDelete = this.Form.controls.ComponentWords.value.length > 2;
    this.handleModifiers();
  }

  handleModifiers() {
    const lastWord = (<FormArray>this.Form.controls.ComponentWords)
      .at(this.Form.controls.ComponentWords.value.length-1).value;
    switch(lastWord.Word) {
      case 'sil':
        this.Form.patchValue({Type: 'Noun'});
        return;
      case 'dex':
        this.Form.patchValue({Type: 'Adjective'});
        return;
      default:
        const firstWord = (<FormArray>this.Form.controls.ComponentWords)
          .at(this.Form.controls.ComponentWords.value.length-1).value;
          switch(firstWord.Word) {
            case 'zalli':
              this.Form.patchValue({Type: 'Interrogative'});
            case 'ersi':
                this.Form.patchValue({Type: 'Noun'});
            default:
              this.Form.patchValue({Type: lastWord.Type});
          }
    }
  }

}
