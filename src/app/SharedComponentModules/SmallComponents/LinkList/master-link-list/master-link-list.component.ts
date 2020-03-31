import { Component, OnInit, QueryList, ViewChildren, Input, TemplateRef, ContentChild, AfterViewInit } from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { LinkListComponent } from '../link-list/link-list.component';
import { LinkList, LinkListElement } from '../linklist';

@Component({
  selector: 'app-master-link-list',
  templateUrl: './master-link-list.component.html',
  styleUrls: ['./master-link-list.component.css']
})
export class MasterLinkListComponent implements AfterViewInit {

  @Input() linkList: LinkList[] = [ new LinkList('default', [ new LinkListElement('tester 1', 'tester1'),
                                                              new LinkListElement('tester 2', 'tester2'),
                                                              new LinkListElement('tester 3', 'tester3') ]),
                                    new LinkList('defaultSub', [new LinkListElement('subtester 1', 'subtester1')]) ];
  @Input() current: string = "tester2";
  @Input() queryParamsHandling: string = '';


  @ContentChild('Label') labelTemplateRef: TemplateRef<any>;
  @ContentChild('Item') itemTemplateRef: TemplateRef<any>;
  @ContentChild('Decoration') decorationTemplateRef: TemplateRef<any>;

  keyManager: FocusKeyManager<any>;
  @ViewChildren(LinkListComponent) items: QueryList<any>;
  leave: boolean;

  initialLabel: string;

  ngAfterViewInit() {
    this.keyManager = new FocusKeyManager(this.items)
    .withVerticalOrientation();
    this.onSelect(this.initialLabel);
  }

  onSelect(selected: string) {
    if(this.keyManager) {
      this.keyManager.setActiveItem(this.linkList
        .findIndex(list => list.Name === selected));
    } else {
      this.initialLabel = selected;
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.stopImmediatePropagation();
      this.keyManager.onKeydown(event);
      return false;
    }
    
    if(event.key === 'Tab') {
      this.leave = true;
      setTimeout(() => { this.leave = false }, 10);
    }
  }

  focus() {
    if(!this.keyManager.activeItem) {
      this.keyManager.setFirstItemActive();
    }
    this.keyManager.activeItem.focusAbove();
  }
}
