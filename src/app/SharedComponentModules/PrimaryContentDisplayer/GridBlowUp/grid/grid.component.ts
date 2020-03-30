import { Component, Input, OnInit, OnDestroy,
         ViewChildren, QueryList, AfterViewInit }   from '@angular/core';
import { FocusKeyManager }                          from '@angular/cdk/a11y';

import { Subscription }                             from 'rxjs';

import { SliderService }                            from 'src/app/SharedComponentModules/SmallComponents/slider/slider.service';
import { RefocusService }                           from '../refocus.service';

import { ImageLinkComponent }                       from '../image-link/image-link.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() collect: any[];
  preview: boolean;
  stream1: Subscription;
  stream2: Subscription;

  keyManager: FocusKeyManager<QueryList<any>>;
  @ViewChildren(ImageLinkComponent) items: QueryList<any>;
  leave = false;

  constructor(private sliderserv: SliderService,
              private refocusserv: RefocusService) { }

  ngOnInit() {
    this.stream1 = this.sliderserv.preview
      .subscribe(preview => this.preview = preview);
    this.stream2 = this.refocusserv.Refocus
      .subscribe(() => this.focus());
  }

  ngAfterViewInit() {
    this.keyManager = new FocusKeyManager(this.items)
    .withHorizontalOrientation('ltr');
    this.keyManager.setFirstItemActive();
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.stopImmediatePropagation();
      this.keyManager.onKeydown(event);
    }
    if(event.shiftKey == true && event.key === 'Tab') {
      this.leave = true;
      setTimeout(() => { this.leave = false; }, 10);
    }
  }

  focus() {
    if(!this.keyManager.activeItem) {
      this.keyManager.setFirstItemActive();
    }
    this.keyManager.activeItem.focus();
  }

}
