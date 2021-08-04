import { Component, OnInit, OnDestroy }       from '@angular/core';
import { CRUDcontrollerService }              from '../../services/CRUDcontroller.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit, OnDestroy {

  constructor(private controller: CRUDcontrollerService) { }

  ngOnInit() {
    this.controller.assignItemType('website');
    this.controller.assignButtons([true, false, false, false]);
  }

  ngOnDestroy() {
    this.controller.assignItemList(undefined);
  }

}
