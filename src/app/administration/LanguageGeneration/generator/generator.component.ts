import { Component, OnInit, OnDestroy,
          Output, EventEmitter } from '@angular/core';
import { Nomadic, Word } from '../rules';
import { Subscription } from 'rxjs';
import { CRUDcontrollerService } from '../../services/CRUDcontroller.service';
import { Validators, FormBuilder, FormGroup }     from '@angular/forms';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: [ '../../Forms/Form.css', './generator.component.css']
})
export class GeneratorComponent implements OnInit, OnDestroy {

  Dictionary: Word[];
  Nomadic = new Nomadic;
  newWords: string[];
  stream: Subscription;
  Form = this.createForm();
  selected: number;
  @Output() wordEmitter: EventEmitter<string> = new EventEmitter();

  constructor(private controller: CRUDcontrollerService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.stream = this.controller.itemList.subscribe(list => {
      this.Dictionary = list;
    });
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

  createForm() {
    return this.fb.group({
      Type: 'Noun',
      Number: ['10', Validators.pattern("^[0-9]*$")],
      Length: [null, Validators.pattern("^[0-9]*$")]
    })
  }

  getWords() {
    let NewWords = [];
    this.selected = undefined;

    this.Form.controls.Length.value === null ?
      length = undefined : length = this.Form.controls.Length.value;
    
    for(let i = 0; i < this.Form.controls.Number.value; i++) {
      NewWords.push(this.Nomadic.makeWord(this.Form.controls.Type.value,
                                          this.Dictionary, length));
    }
    this.newWords = NewWords;
  }

  onSelect(word: string, index: number) {
    this.selected = index;
    this.wordEmitter.emit(word);
    console.log(word);
  }

}
