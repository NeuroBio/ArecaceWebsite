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

  constructor(private editserv: CRUDcontrollerService) { }

  ngOnInit() {
    this.stream1 = this.editserv.itemType.subscribe(type => {
      this.type = type;
      this.editserv.assignEditItem(undefined);
      this.loading = true;
      this.editserv.getEditableCollection(this.firePaths[type])
        .subscribe(collect => {
          this.selectable = collect;
          this.loading = false;
      });
    });
  }
  
  ngOnDestroy(){
    this.stream1.unsubscribe();
    this.editserv.assignEditItem(undefined);
  }

  onSelect(selected: string, ind: number){
      this.selected = selected;
      this.editserv.assignEditItem(this.selectable[ind])  
  }

}