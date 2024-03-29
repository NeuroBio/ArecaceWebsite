import { Component, Input, OnChanges }  from '@angular/core';
import { FormBuilder }                  from '@angular/forms';

import { CRUDcontrollerService }        from '../../../administration/services/CRUDcontroller.service';

import { Word }                         from '../../../Classes/NomadicLanguage';
import { WordTypes }                    from '../../../Classes/NomadicLanguage';
@Component({
  selector: 'app-language-table',
  templateUrl: './language-table.component.html',
  styleUrls: ['./language-table.component.css']
})
export class LanguageTableComponent implements OnChanges {

  @Input() Dictionary: Word[];
  @Input() Edit: boolean;

  wordTypes = new WordTypes();
  currentDict: Word[];
  CoreWords : Number;
  Form = this.createForm();

  sortOptions = ['Alphebetical-Nomadic', 'Alphebetical-English', 'Type', 'Subtype', 'Type and Subtype'];
  levelFilterOptions = ['All', 'Level 1', 'Level 2', 'Level 3+'];
  typeFilterOptions = Object.assign([], ['All'].concat(this.wordTypes.Types));
  subtypeFilterOptions = Object.assign([], ['All'].concat(this.wordTypes.Subtypes));

  constructor(private controller: CRUDcontrollerService,
              private fb: FormBuilder) { }

  ngOnChanges() {
    if(this.Dictionary) {
      this.CoreWords = this.Dictionary.filter(word => word.Level === 1).length;
      this.onFilterLevel();
    }
  }

  loadWord(index: number) {
    this.controller.assignEditItem(this.currentDict[index]);
  }

  createForm() {
    return this.fb.group({
      SortType: 'Alphebetical-Nomadic',
      FilterLevel: 'All',
      FilterType: 'All',
      FilterSubtype: 'All'
    });
  }

  onFilterLevel(first: boolean = true) {
    switch(this.Form.controls.FilterLevel.value) {
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
    
    if(first) {
      this.onFilterType(false);
      this.onFilterSubtype(false);
      this.onSortType();
    }
  }

  onFilterType(first: boolean = true) {
    if(first) {
      this.onFilterLevel(false);
    }
    const type = this.Form.controls.FilterType.value;

    if(type !== 'All') {
      this.currentDict = this.currentDict.filter(word => word.Type === type);
    }

    if(first) {
      this.onFilterSubtype(false);
      this.onSortType();
    }
  }

  onFilterSubtype(first: boolean = true) {
    if(first){
      this.onFilterLevel(false);
      this.onFilterType(false);
    }
    const subtype = this.Form.controls.FilterSubtype.value;

    if(subtype !== 'All') {
      this.currentDict = this.currentDict.filter(word => word.Subtype === subtype);
    }

    if(first) {
      this.onSortType();
    }
  }

  onSortType() {
    switch(this.Form.controls.SortType.value) {
      case 'Alphebetical-Nomadic':
        this.currentDict.sort((a,b) => a.Indativor < b.Indativor ? -1 : 1);
        break;
      case 'Alphebetical-English':
          this.currentDict.sort((a,b) => a.English.toLowerCase() < b.English.toLowerCase() ? -1 : 1);
          break;
      case 'Subtype':
        this.currentDict.sort((a,b) => a.Subtype < b.Subtype ? -1 :  a.Subtype > b.Subtype ? 1 : 0);
        break;
      case 'Type':
        this.currentDict.sort((a,b) => a.Type < b.Type ? -1 :  a.Type > b.Type ? 1 : 0);
        break;
      case 'Type and Subtype':
        this.currentDict.sort((a,b) => a.Subtype < b.Subtype ? -1 :  a.Subtype > b.Subtype ? 1 : 0);
        this.currentDict.sort((a,b) => a.Type < b.Type ? -1 :  a.Type > b.Type ? 1 : 0);
        break;
    }
  }

}
