import { Component, OnInit, OnDestroy } from '@angular/core';
import { NomadicService } from '../nomadic.service';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { TranslationService } from './translation.service';
@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})

export class TranslateComponent implements OnInit, OnDestroy {

  stream: Subscription;
  transdicts: any;
  keySets: any;
  keys: string[];
  translation = '';
  Form = this.createForm();


  constructor(private nomadserv: NomadicService,
              private fb: FormBuilder,
              private translationserv: TranslationService) { }

  ngOnInit() {
    this.stream = this.nomadserv.TranslationDictionary
    .subscribe(dicts => {
      this.transdicts = dicts
      this.keySets = {
        NtoE: Object.keys(this.transdicts.NtoETrans).sort((a,b) => a < b ? -1 : 1),
        EtoN: Object.keys(this.transdicts.EtoNTrans).sort((a,b) => a < b ? -1 : 1)}
      this.keys = this.keySets.NtoE;
    });
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

  createForm() {
    return this.fb.group({
      RawText: '',
      NtoE: 'true'
    });
  }

  translate(process: boolean = true) {
    if(!this.Form.controls.RawText) {
      return;
    }
    const translate = [];
    let dict = this.Form.controls.NtoE.value === 'true' ? 'NtoETrans' : 'EtoNTrans'
    const text = this.Form.controls.RawText.value.replace(/[\.,\/#!$%\^&;:{}=_`~@\+\?><\[\]\+"]/g, '')
                                                  .replace(/\n/g, ' ')
                                                  .toLowerCase();
    const words = process === true ? text.trim().replace(/\s{2,}/g," ").split(' ')
                                    : text.split(' ');   
    words.forEach(word => {
      const trans = this.translationserv.wordChecks(this.Form.controls.NtoE.value === 'true', word, dict);
      translate.push(`${trans}`);
    }); 
    let finalText = this.Form.controls.RawText.value.trim()
                                                    .replace(/[\*']/g, '')
                                                    .replace(/\n/g, '\*')
                                                    .replace(/(\*{1,})/g, ' $1')
                                                    .replace(/\s{2,}/g, ' ');

    let Start = true;
    console.log(finalText.split(' '))
    finalText = finalText.split(' ').map((word, index) => {
      const quiet = ((/[a-z]/).test(word) || word.match(/\w/g).length === 1);
      word = word.replace(/\w{1,}/, translate[index]);
      
      if(quiet === false) {
        word = word.toUpperCase();
        Start = false;
      } else if(Start === true) {
        word = word.replace(/\w/, char => char.toUpperCase());
        Start = false;
      }
      if((/([\?!\.])$/).test(word)) {
        Start = true;
      }
      return word;
    });
    this.translation = finalText.join(' ').replace(/\*/g, '\n');
  }

  addWord(word: string) {
    const newText = this.Form.controls.RawText.value
                        .trim()
                        .replace(/\s{2,}/g," ")
                        .split(' ');
    newText.push(word);
    this.Form.patchValue({RawText: newText.join(' ')});
    this.translate(false);
  }

  switchDict() {
    const dict = this.Form.controls.NtoE.value === 'true' ? 'NtoE' : 'EtoN';
    this.keys = this.keySets[dict];
    this.translate();
  }

}
