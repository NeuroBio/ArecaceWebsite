import { Injectable } from '@angular/core';
import { NomadicService } from '../nomadic.service';
import { SwapCases } from './TranslationSwapCases';
import { Word } from '../../../Classes/rules';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  rawDict: Word[];
  transDicts: any;
  Swap = new SwapCases();

  constructor(private nomadserv: NomadicService) {
    this.rawDict = this.nomadserv.RawDictionary.value;
    this.transDicts = this.nomadserv.TranslationDictionary.value;
   }

  wordChecks(NtoE: boolean, word: string, dict: string) {
    if(this.Swap[dict][word]) {
      return this.Swap[dict][word];
    }
    let trans = this.transDicts[dict][word];
    if(trans) {
      return trans;
    }
    let letters = word.split('');
    if(NtoE === true) {
      trans = this.checkEnding(letters, ['a'], dict, '\'s');//possesive check
      if(trans) {
          return trans;
      }
      trans = this.checkEnding(letters, ['i'],  dict, 's');//plural check
      if(trans) {
        return trans;
      }
      trans = this.checkEnding(letters, ['l', 'i'], dict, 's');//plural check
      if(trans) {
          return trans;
      }
      trans = this.checkEnding(letters, ['i', 'a'], dict, 's\'');//possessive plural check
      if(trans) {
        return trans;
      }
      trans = this.checkEnding(letters, ['l', 'i', 'a'], dict, 's\'');//possessive plural check
      if(trans) {
        return trans;
      }
  
    } else {
      trans =  this.checkEnding(letters, ['\'', 's'], dict, 'a', 'h', ['a']);//possesive check
      if(trans) {
        return trans;
      }
      trans =  this.checkEnding(letters, ['s'], dict, 'i', 'l', ['a', 'e', 'i', 'o']);//plural check
      if(trans) {//check if word was a noun or a verb
        const verbcheck = trans.split('').splice(0, trans.length - 1).join('');
        const wordInfo = this.rawDict.find(word => word.Indativor === verbcheck);
        if(wordInfo && wordInfo.Type === 'Verb') {
          return verbcheck;
        }
        return trans;
      }
      trans =  this.checkEnding(letters, ['s', '\''], dict, 'ia', 'l', ['a', 'e', 'i', 'o']);//possessive plural check
      if(trans) {
        return trans;
      }

      trans =  this.checkEnding(letters, ['i', 'n', 'g'], dict, '');//ing verbs check
      if(trans) {
        return trans;
      }
      if(letters.length > 5 && letters[letters.length-4] === letters[letters.length-5]) {
        const double = letters[letters.length-4];
        trans =  this.checkEnding(letters, [double, 'i', 'n', 'g'], dict, '');//**ing verbs check
        if(trans) {
          return trans;
        } 
      }
    }
    return `[${word}]`;
  }

  checkEnding(letters: string[], check: string[], dict: string,
    suffix1: string, suffix2?: string, specialcase?: string[]) {
    const ending = Object.assign([], letters)
                         .slice(letters.length - (check.length), letters.length);

    if(this.arraysEqual(check, ending)) {//if endings match, cut off ending
      const coreLetters = Object.assign([], letters)
                                .splice(0, letters.length - check.length)
                                .join('');
      const trans = this.transDicts[dict][coreLetters];

      if(trans) {
          return this.addSuffixtoAll(trans, suffix1, suffix2, specialcase);
      }
    }
    return;
  }

  addSuffix(word: string, suffix1: string, suffix2?: string, specialcase?: string[]){
    const trans = word.split('');
    if(suffix2){
      const special = specialcase
        .findIndex(letter => letter === trans[trans.length-1]) > -1;
      if(special){
          trans.push(suffix2);
      }
    }
    trans.push(suffix1);
    return trans.join('');
  }

  addSuffixtoAll(word: string, suffix1: string, suffix2?: string, specialcase?: string[]){
    let trans = Object.assign([], word.split(';'));
    trans = trans.map(trans => this.addSuffix(trans, suffix1, suffix2, specialcase));
    return trans.join(';');
  }

  arraysEqual(first: any[], second: any[]) {
    for(let i = 0; i < first.length; i++) {
      if(first[i] !== second[i]) {
        return false;
      }
      return true;
    }
  }
}
