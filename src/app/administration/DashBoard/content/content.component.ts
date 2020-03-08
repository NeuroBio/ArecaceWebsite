import { Component, OnInit, OnDestroy }   from '@angular/core';
import { ActivatedRoute }                 from '@angular/router';

import {Subscription}                     from 'rxjs';

import { CRUDcontrollerService }          from '../../services/CRUDcontroller.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

export class ContentComponent implements OnInit, OnDestroy {

  edit = false;
  stream: Subscription;
  constructor(private route: ActivatedRoute,
              private controller: CRUDcontrollerService) { }

  ngOnInit() {
    this.controller.assignButtons([true, true, true, true]);
    this.stream = this.route.firstChild.url.subscribe(path =>
        this.controller.assignItemType(path[path.length-1].toString())
    );
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }
  
  onEditCheck(edit:boolean) {
    this.edit = edit;
  }

  onAllow(type:number) {
    if (type === 0) {
      this.controller.updateButton('Delete', false);
      this.controller.updateButton('UpdateAll', false);
    } else if(type === 1) {
      this.controller.updateButton('Delete', true);
      this.controller.updateButton('UpdateAll', false);
    } else {
      this.controller.updateButton('Delete', false);
      this.controller.updateButton('UpdateAll', true);
    }
  }
  
}
