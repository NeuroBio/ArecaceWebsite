import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription }                 from 'rxjs';

import { CRUDcontrollerService }                  from '../../services/CRUDcontroller.service';
import { FirebasePaths }          from '../../../Classes/FirebasePaths';


@Component({
  selector: 'app-editlist',
  templateUrl: './editlist.component.html',
  styleUrls: ['./editlist.component.css']
})

export class EditListComponent implements OnInit, OnDestroy {
  
  firePaths = new FirebasePaths;
  path: string;
  type: string;

  selected: string;
  selectable: any[];
  loading: boolean = false;
  
  stream1: Subscription;
  stream2: Subscription;

  constructor(private controller: CRUDcontrollerService) { }

  ngOnInit() {
    this.stream1 = this.controller.itemType.subscribe(type => {
      this.type = type;
      this.controller.assignEditItem(undefined);
      this.loading = true;
      this.controller.assignItemList(this.firePaths[type])
    });
    
    this.stream2 = this.controller.itemList.subscribe(list => {
      this.selectable = list;
      this.loading = false;
    });
  }
  
  ngOnDestroy(){
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.controller.assignEditItem(undefined);
  }

  onSelect(selected: string, ind: number){
      this.selected = selected;
      this.controller.assignEditItem(this.selectable[ind])  
  }

}