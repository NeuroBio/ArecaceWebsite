import { Component, OnInit, OnDestroy } from '@angular/core';
import { NomadicService } from '../nomadic.service';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';

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
              private fb: FormBuilder) { }

  ngOnInit() {
    this.stream = this.nomadserv.TranslationDictionary
    .subscribe(dicts => {
      this.transdicts = dicts
      this.keySets = {
        NtoE: Object.keys(this.transdicts.NtoETrans).sort((a,b) => a < b ? -1 : 1),
        EtoN: Object.keys(this.transdicts.EtoNTrans).sort((a,b) => a < b ? -1 : 1)}
      this.keys = this.keySets.NtoE;
      console.log(this.keySets.EtoN)
    });
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

  createForm() {
    return this.fb.group({
      RawText: '',
      NtoE: true
    });
  }

  translate(process: boolean = true) {
    const translate = [];
    let dict = this.Form.controls.NtoE.value === true ? 'NtoETrans' : 'EtoNTrans'
    const text = this.Form.controls.RawText.value
      .replace(/[\.,\/#!$%\^&\*;:{}=_`~@\+\?><\[\]\+'"]/g, '');
    const words = process === true ? this.processText(text) : text.split(' ');
    
      words.forEach(word => {
        const trans = this.transdicts[dict][word]
        if(trans){
          translate.push(`[${trans}]`);
        } else {
          translate.push('[?]')
        }
      });  

    this.translation = translate.join(' ');
  }

  addWord(word: string) {
    const newText = this.processText(this.Form.controls.RawText.value);
    newText.push(word);

    this.Form.patchValue({RawText: newText.join(' ')});
    this.translate();
  }

  processText(text: string) {
    const words = text.replace(/\s{2,}/g," ").split(' ');

    for(let i = words.length-1; i > -1; i--) {
      if(words[i] === '') {
        words.splice(i, 1);
      }
    }
    return words;
  }

  switchDict() {
    const dict = this.Form.controls.NtoE.value === true ? 'NtoE' : 'EtoN';
    this.keys = this.keySets[dict];
  }

}
