import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';

import { SliderService } from 'src/app/SharedComponentModules/SmallComponents/slider/slider.service';
import { GridService } from '../refocus.service';

import { LinkListComponent } from 'src/app/SharedComponentModules/SmallComponents/LinkList/link-list/link-list.component';

import { LinkList, LinkListElement } from 'src/app/SharedComponentModules/SmallComponents/LinkList/linklist';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent implements OnInit, OnDestroy {

  formattedCollect = new LinkList('Grid', []);
  @Input() collect: any[];

  init = true;
  preview: boolean;

  @ViewChild(LinkListComponent) linklistElement: any;

  stream1: Subscription;
  stream2: Subscription;
  stream3: Subscription;

  constructor(
    private sliderserv: SliderService,
    private gridserv: GridService
  ) { }

  ngOnInit() {
    this.stream1 = this.sliderserv.preview
      .subscribe(preview => {
        this.preview = preview;
        if (this.init === false) {
          this.updateLinks();
        }
    });

    this.stream2 = this.gridserv.Refocus
      .subscribe(() => this.focus());
    this.stream3 = this.gridserv.Sorted
      .subscribe(() => this.updateOrder());

    this.initializeData()
    this.init = false;
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.stream3.unsubscribe();
  }

  initializeData() {
    this.formattedCollect.Data =
    this.collect.map(item =>
      new LinkListElement(item.Name,
                          this.preview === true ? item.ID : `${item.ID}/Download`,
                          undefined, item));
  }

  updateLinks() {
    this.formattedCollect.Data.map(item => 
      item.Route = this.preview === true
      ? item.Item.ID
      : `${item.Item.ID}/Download`);
  }

  updateOrder() {
    this.formattedCollect.Data.map((item, i) => {
      item.ListName = this.collect[i].Name,
      item.Route = this.preview === true ? this.collect[i].ID : `${this.collect[i].ID}/Download`,
      item.Item = this.collect[i]
      return item;
    })
  }

  focus() {
    this.linklistElement.Host.nativeElement.focus();
  }

}
