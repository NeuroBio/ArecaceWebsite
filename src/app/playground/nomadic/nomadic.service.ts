import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Word } from '../../Classes/NomadicLanguage';

@Injectable({
  providedIn: 'root'
})
export class NomadicService {

  RawDictionary = new BehaviorSubject<Word[]>(null);
  TranslationDictionary = new BehaviorSubject<{}>(null);
  stream: Subscription;
  constructor() { }

  initializeDictionary(dict: BehaviorSubject<Word[]>) {
    return this.stream = dict.subscribe(d => {
      this.RawDictionary.next(d);
      this.initializeTranslations(d);
    });
  }

  initializeTranslations(dict: Word[]) {
    const NtoETrans = {};
    const EtoNTrans = {};
    dict.forEach(word => {
      word.English.split(';').forEach(english => {
        EtoNTrans[english.toLowerCase()] = word.Indativor;
      });
      NtoETrans[word.Indativor.toLowerCase()] = word.English;
    });
    this.TranslationDictionary.next({'NtoETrans': NtoETrans,
                                     'EtoNTrans': EtoNTrans});
  }

  dispose() {
    if (this.stream) {
      this.stream.unsubscribe();
    }
  }
}
