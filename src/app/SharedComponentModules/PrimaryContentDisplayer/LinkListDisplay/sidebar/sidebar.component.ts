import { Component, Input, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';

import { LinkList } from '../../../SmallComponents/LinkList/linklist';
import { LinkListElement } from '../../../SmallComponents/LinkList/linklist';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../options/options.component.css']
})

export class SideBarComponent implements AfterViewInit {

  @Input() linkList: LinkList[] = [
    new LinkList('default', [
      new LinkListElement('tester 1', 'tester1'),
                              new LinkListElement('tester 2', 'tester2'),
                              new LinkListElement('tester 3', 'tester3')
    ]),
    new LinkList('defaultSub', [new LinkListElement('subtester 1', 'subtester1')]) ];
  @Input() current = 'tester2';
  @Input() queryParamsHandling = '';

  @ViewChild('container', { static: true }) container: ElementRef;
  @ViewChild('list', { static: true }) list: any;

  listHeight = 0;
  greybarHeight = 0;
  resizeTimer: any;

  ngAfterViewInit() {
    this.onResize();
  }

  @HostListener('window:scroll')
  onResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      if (this.listHeight < this.list.nativeElement.offsetHeight
        && this.listHeight < window.innerHeight) { // allow appropriate growth
        this.listHeight = window.innerHeight -
        Math.max(this.container.nativeElement.getBoundingClientRect().top, 0);
        this.greybarHeight = this.container.nativeElement.scrollHeight;
      }

      setTimeout(() => {
        if (this.container.nativeElement.getBoundingClientRect().bottom > window.innerHeight) {
          this.listHeight += (window.innerHeight - this.container.nativeElement.getBoundingClientRect().bottom);
        }

        if (this.container.nativeElement.getBoundingClientRect().top < 0) {
          this.listHeight = (this.container.nativeElement.getBoundingClientRect().height +
          this.container.nativeElement.getBoundingClientRect().top);
        }
      }, 3);
    }, 20);
  }

}
