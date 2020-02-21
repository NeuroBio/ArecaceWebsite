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
    const translate = [];
    let dict = this.Form.controls.NtoE.value === 'true' ? 'NtoETrans' : 'EtoNTrans'
    const text = this.Form.controls.RawText.value
      .replace(/[\.,\/#!$%\^&\*;:{}=_`~@\+\?><\[\]\+"]/g, '');
    const words = process === true ? this.processText(text) : text.split(' ');
    
      words.forEach(word => {
        const trans = this.wordChecks(this.Form.controls.NtoE.value === 'true', word, dict);
        translate.push(`[${trans}]`);
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
    const dict = this.Form.controls.NtoE.value === 'true' ? 'NtoE' : 'EtoN';
    this.keys = this.keySets[dict];
    this.translate();
  }

  wordChecks(NtoE: boolean, word: string, dict: string) {
    let trans = this.transdicts[dict][word];
    if(trans) {
      return(trans);
    }
    trans = this.posessiveCheck(NtoE, word, dict);
    if(trans) {
        return(trans);
    }
    trans = this.pluralCheck(NtoE, word, dict);
    if(trans) {
        return(trans);
    }
    trans = this.pluralposessiveCheck(NtoE, word, dict);
    if(trans) {
      return(trans);
    }
    return '?';
  }

  posessiveCheck(NtoE: boolean, word: string, dict: string){
    let letters = word.split('');
    if(NtoE === true) {
      if(letters[letters.length-1] === 'a') {
        letters.pop();
        let trans = this.transdicts[dict][letters.join('')];
        if(trans) {
          return this.addSuffixtoAll(trans, '\'s');
         }
      }
    } else if(letters[letters.length-2] === '\'') {
      letters = letters.splice(0, word.length-2);
      let trans = this.transdicts[dict][letters.join('')];
      if(trans) {
        return this.addSuffix(trans, 'a', 'h', ['a']);
      }
    }
    return;
  }

  pluralCheck(NtoE: boolean, word: string, dict: string) {
    const letters = word.split('');
    if(NtoE === true) {
      if(letters[letters.length-1] === 'i') {//consonant plurals
        letters.pop();
        let trans = this.transdicts[dict][letters.join('')];
        if(trans) {
          return this.addSuffixtoAll(trans, 's');
        } else if(letters[letters.length-1] === 'l'){//vowel plurals
          letters.pop();
          trans = this.transdicts[dict][letters.join('')];
          if(trans) {
            return this.addSuffixtoAll(trans, 's');
          }
        }
      }
    } else if(letters[letters.length-1] === 's') {//remove plural s
      letters.pop();
      const trans = this.transdicts[dict][letters.join('')]
      if(trans) {//is there was a translation, return plural form
        return this.addSuffix(trans, 'i', 'l', ['a', 'e', 'i', 'o']);
      }
    }
    return;
  }

  pluralposessiveCheck(NtoE: boolean, word: string, dict: string) {
    let letters = word.split('');
    if(NtoE === true) {
      if(letters[letters.length-1] === 'a'
        && letters[letters.length-2] === 'i') {
        letters = letters.splice(0, word.length-2);
        let trans = this.transdicts[dict][letters.join('')];
        if(trans) {
          return this.addSuffixtoAll(trans, 's\'');
        } else if(letters[letters.length-1] === 'l'){//vowel plurals
          letters.pop();
          trans = this.transdicts[dict][letters.join('')];
          if(trans) {
            return this.addSuffixtoAll(trans, 's\'');
          }
        }
      }
    } else {
      if(letters[letters.length-1] === '\''){
        letters = letters.splice(0, word.length-2);
        let trans = this.transdicts[dict][letters.join('')];
        if(trans) {
          return this.addSuffix(trans, 'ia', 'l', ['a', 'e', 'i', 'o']);
        }
      }
    }
    return '?';
  }

  addSuffix(word: string, suffix: string, suffix2?: string, specialcase?: string[]){
    const trans = word.split('');
    if(suffix2){
      const special = specialcase
        .findIndex(letter => letter === trans[trans.length-1]) > -1;
      if(special){
          trans.push(suffix2);
      }
    }
    trans.push(suffix);
    return trans.join('');
  }

  addSuffixtoAll(word: string, suffix: string){
    let trans = Object.assign([], word.split(';'));
    trans = trans.map(trans => this.addSuffix(trans, suffix));
    return trans.join(';');
  }

}
