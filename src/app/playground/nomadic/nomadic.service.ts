import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Word } from '../../Classes/rules'

@Injectable({
  providedIn: 'root'
})
export class NomadicService {

  RawDictionary = new BehaviorSubject<Word[]>(null);
  TranslationDictionary = new BehaviorSubject<{}>(null);

  constructor() { }

  initializeDictionary(dict: Word[]) {
    this.RawDictionary.next(dict);
    this.initializeTranslations(dict);
  }

  initializeTranslations(dict: Word[]) {
    let NtoETrans = {};
    let EtoNTrans = {};
    dict.forEach(word => {
      word.English.split(';').forEach(english => {
        EtoNTrans[english] = word.Indativor;
      });
      NtoETrans[word.Indativor] = word.English;
    });
    this.TranslationDictionary.next({'NtoETrans': NtoETrans,
                                     'EtoNTrans': EtoNTrans});
  }
}
