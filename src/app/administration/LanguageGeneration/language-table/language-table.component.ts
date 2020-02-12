import { Component, OnInit, OnDestroy } from '@angular/core';
import { Word } from '../rules';
import { Subscription } from 'rxjs';
import { CRUDcontrollerService } from '../../services/CRUDcontroller.service';

@Component({
  selector: 'app-language-table',
  templateUrl: './language-table.component.html',
  styleUrls: ['./language-table.component.css']
})
export class LanguageTableComponent implements OnInit, OnDestroy {

  Dictionary: Word[];
  stream: Subscription;

  constructor(private controller: CRUDcontrollerService) { }

  ngOnInit() {
    this.stream = this.controller.itemList.subscribe(dict => {
      if(dict){
        this.Dictionary = this.sortDictionary(dict);
      }
    });
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

  loadWord(index: number) {
    this.controller.assignEditItem(this.Dictionary[index]);
  }

  sortDictionary(dict: Word[]) {
    dict.sort((a,b) => a.Indativor < b.Indativor ? -1 : 1);
    dict.sort((a,b) => a.Type < b.Type ? -1 :  a.Type > b.Type ? 1 : 0);
    return dict;
  }
}
