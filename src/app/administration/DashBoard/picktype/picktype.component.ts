import { Component, OnInit, OnDestroy }   from '@angular/core';
import { Subscription }                   from 'rxjs';

import { CRUDcontrollerService }          from '../../services/CRUDcontroller.service';

@Component({
  selector: 'app-picktype',
  templateUrl: './picktype.component.html',
  styleUrls: ['./picktype.component.css']
})

export class PickTypeComponent implements OnInit, OnDestroy {

  current: string;
  stream1: Subscription;
  typeList: string[];

  constructor(private controller: CRUDcontrollerService) { }
  
  ngOnInit() {
    this.stream1 = this.controller.itemType.subscribe(type  => this.current = type);
    this.typeList = Object.keys(this.controller.firePaths);
    this.typeList = this.typeList.filter(type =>
      this.controller.firePaths[type].SpecialUpload === false);
  }
  
  ngOnDestroy() {
    this.stream1.unsubscribe();
  }
  
  onClick(type: string){
    this.controller.assignItemType(type);
    this.current = type;
  }
}
