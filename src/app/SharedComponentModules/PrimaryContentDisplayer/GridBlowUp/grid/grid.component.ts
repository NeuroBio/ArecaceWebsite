import { Component, Input, OnInit, OnDestroy,
         ViewChild, ElementRef }                    from '@angular/core';

import { Subscription }                             from 'rxjs';

import { SliderService }                            from 'src/app/SharedComponentModules/SmallComponents/slider/slider.service';
import { RefocusService }                           from '../refocus.service';

import { LinkListComponent }                        from 'src/app/SharedComponentModules/SmallComponents/LinkList/link-list/link-list.component';

import { LinkList, LinkListElement }                from 'src/app/SharedComponentModules/SmallComponents/LinkList/linklist';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  
  styleUrls: ['./grid.component.css']
})

export class GridComponent implements OnInit, OnDestroy {

  @Input() collect: any[];
  formattedCollect = new LinkList('Grid', []);
  init = true;

  @ViewChild(LinkListComponent) linklistElement: any;

  stream1: Subscription;
  stream2: Subscription;

  constructor(private sliderserv: SliderService,
              private refocusserv: RefocusService) { }

  ngOnInit() {
    this.stream1 = this.sliderserv.preview
      .subscribe(preview => {
        this.quickFormat(preview);
      });
    this.stream2 = this.refocusserv.Refocus
      .subscribe(() => this.focus());
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
  }

  quickFormat(preview: boolean) {
    if(this.init === true) { //create
      this.formattedCollect.Data =
      this.collect.map(item =>
        new LinkListElement(item.Name,
                            preview === true ? item.ID : `${item.ID}/Download`,
                            undefined, item));
      this.init = false;
    } else { //update
      this.formattedCollect.Data.map(item =>
        item.Route =  preview === true ? item.Item.ID : `${item.Item.ID}/Download`);
    }

  }

  focus() {
    this.linklistElement.Host.nativeElement.focus();
  }

}
