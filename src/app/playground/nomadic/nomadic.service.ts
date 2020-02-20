import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Word } from '../../Classes/rules'

@Injectable({
  providedIn: 'root'
})
export class NomadicService {

  Dictionary = new BehaviorSubject<Word[]>(null);

  constructor() { }

  initializeDictionary(dict: Word[]) {
    this.Dictionary.next(dict);
  }
}
