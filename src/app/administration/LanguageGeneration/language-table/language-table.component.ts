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
  sortOptions = ['All', 'Alphebetical', 'Type', 'Subtype'];

  constructor(private controller: CRUDcontrollerService) { }

  ngOnInit() {
    this.stream = this.controller.itemList.subscribe(dict => {
      if(dict){
        this.Dictionary = dict;
        this.onSort('All');
      }
    });
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

  loadWord(index: number) {
    this.controller.assignEditItem(this.Dictionary[index]);
  }

  onSort(style: string) {
    switch(style) {
      case 'Alphebetical':
        this.Dictionary.sort((a,b) => a.Indativor < b.Indativor ? -1 : 1);
        break;
      case 'SubType':
        this.Dictionary.sort((a,b) => a.Indativor < b.Indativor ? -1 : 1);
        this.Dictionary.sort((a,b) => a.Subtype < b.Subtype ? -1 :  a.Subtype > b.Subtype ? 1 : 0);
        break;
      case 'Type':
        this.Dictionary.sort((a,b) => a.Indativor < b.Indativor ? -1 : 1);
        this.Dictionary.sort((a,b) => a.Type < b.Type ? -1 :  a.Type > b.Type ? 1 : 0);
        break;
      case 'All':
        this.Dictionary.sort((a,b) => a.Indativor < b.Indativor ? -1 : 1);
        this.Dictionary.sort((a,b) => a.Subtype < b.Subtype ? -1 :  a.Subtype > b.Subtype ? 1 : 0);
        this.Dictionary.sort((a,b) => a.Type < b.Type ? -1 :  a.Type > b.Type ? 1 : 0);
        break;
    }

  }
}
