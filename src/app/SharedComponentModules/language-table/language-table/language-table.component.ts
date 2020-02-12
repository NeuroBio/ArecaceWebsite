import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Word } from '../../../Classes/rules';
import { CRUDcontrollerService } from '../../../administration/services/CRUDcontroller.service';

@Component({
  selector: 'app-language-table',
  templateUrl: './language-table.component.html',
  styleUrls: ['./language-table.component.css']
})
export class LanguageTableComponent implements OnChanges {

  @Input() Dictionary: Word[];
  @Input() Edit: boolean;
  currentDict: Word[];
  CoreWords : Number;
  Sort = 'Type and Subtype';
  Filter = 'All';
  sortOptions = ['Type and Subtype', 'Alphebetical', 'Type', 'Subtype'];
  filterOptions = ['All', 'Level 1', 'Level 2', 'Level 3+'];

  constructor(private controller: CRUDcontrollerService) { }

  ngOnChanges() {
    if(this.Dictionary) {
      this.CoreWords = this.Dictionary.filter(word => word.Level === 1).length;
      this.onFilter(this.Filter);
    }
  }

  loadWord(index: number) {
    this.controller.assignEditItem(this.currentDict[index]);
  }
  onFilter(style: string) {
    switch(style) {
      case 'All':
        this.currentDict = Object.assign([], this.Dictionary);
        break;
      case 'Level 1':
        this.currentDict = this.Dictionary.filter(word => word.Level === 1);
        break;
      case 'Level 2':
        this.currentDict = this.Dictionary.filter(word => word.Level === 2);
        break;
      case 'Level 3+':
        this.currentDict = this.Dictionary.filter(word => word.Level > 2);
        break;
    }
    this.onSort(this.Sort);
  }
  onSort(style: string) {
    switch(style) {
      case 'Alphebetical':
        this.currentDict.sort((a,b) => a.Indativor < b.Indativor ? -1 : 1);
        break;
      case 'Subtype':
        this.currentDict.sort((a,b) => a.Indativor < b.Indativor ? -1 : 1);
        this.currentDict.sort((a,b) => a.Subtype < b.Subtype ? -1 :  a.Subtype > b.Subtype ? 1 : 0);
        break;
      case 'Type':
        this.currentDict.sort((a,b) => a.Indativor < b.Indativor ? -1 : 1);
        this.currentDict.sort((a,b) => a.Type < b.Type ? -1 :  a.Type > b.Type ? 1 : 0);
        break;
      case 'Type and Subtype':
        this.currentDict.sort((a,b) => a.Indativor < b.Indativor ? -1 : 1);
        this.currentDict.sort((a,b) => a.Subtype < b.Subtype ? -1 :  a.Subtype > b.Subtype ? 1 : 0);
        this.currentDict.sort((a,b) => a.Type < b.Type ? -1 :  a.Type > b.Type ? 1 : 0);
        break;
    }
  }

}
