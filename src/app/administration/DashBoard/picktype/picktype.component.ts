import { Component, OnInit, OnDestroy }   from '@angular/core';

import { Subscription }                   from 'rxjs';

import { CRUDcontrollerService }          from '../../services/CRUDcontroller.service';
import { FileHierarchy }                  from 'src/app/Classes/filehierarchy';

@Component({
  selector: 'app-picktype',
  templateUrl: './picktype.component.html',
  styleUrls: ['./picktype.component.css']
})

export class PickTypeComponent implements OnInit, OnDestroy{

  current: string;
  stream: Subscription;
  typeList: string[] = Object.keys(new FileHierarchy);

  constructor(private controller: CRUDcontrollerService) { }
  
  ngOnInit(){
    this.stream = this.controller.itemType.subscribe(type  => this.current = type);
  }
  
  ngOnDestroy(){
    this.stream.unsubscribe();
  }
  onClick(type: string){
    this.controller.assignItemType(type);
    this.current = type;
  }
}
