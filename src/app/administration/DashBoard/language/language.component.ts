import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }                 from 'rxjs';

import { CRUDcontrollerService }        from '../../services/CRUDcontroller.service';
import { Word }                         from '../../../Classes/NomadicLanguage';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})

export class LanguageComponent implements OnInit, OnDestroy {

  simple = true;
  disableSwitchWord = false;
  Dictionary: Word[];
  stream1: Subscription;
  stream2: Subscription;

  constructor(private controller: CRUDcontrollerService) { }

  ngOnInit() {
    this.controller.assignButtons([true, true, true, false]);
    this.controller.assignItemType('nomadic');
    this.controller.assignItemList('Nomadic');
    this.stream1 = this.controller.itemToEdit.subscribe(word => {
      if(word) {
        this.simple = word.Level === 1;
        this.disableSwitchWord = true;
      } else {
        this.disableSwitchWord = false;
      }
    });
    this.stream2 = this.controller.itemList.subscribe(dict => this.Dictionary = dict);
  }

   ngOnDestroy() {
     this.stream1.unsubscribe();
     this.stream2.unsubscribe();
     this.controller.assignItemList(undefined);
   }

  pickWordType(simple: boolean) {
    this.simple = simple;
  }
}
