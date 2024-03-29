import { Component, OnInit, Input, ViewChild,
         ElementRef, QueryList, ViewChildren }  from '@angular/core';
import { FocusKeyManager }                      from '@angular/cdk/a11y';

import { LinkListComponent }                    from '../../../SmallComponents/LinkList/link-list/link-list.component';
import { LinkList, LinkListElement }            from 'src/app/SharedComponentModules/SmallComponents/LinkList/linklist';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['../options/options.component.css',
              './drop-down.component.css']
})

export class DropDownComponent implements OnInit {

  @Input() linkList: LinkList[] = [ new LinkList('default', [ new LinkListElement('tester 1', 'tester1'),
                                                              new LinkListElement('tester 2', 'tester2'),
                                                              new LinkListElement('tester 3', 'tester3') ]),
                                    new LinkList('defaultSub', [new LinkListElement('subtester 1', 'subtester1')]) ];
  @Input() current: string = "tester2";
  @Input() queryParamsHandling: string = '';

  revealArray: boolean[] = [];
  @ViewChild('linkListHolder', { static: true }) linkListHolder: ElementRef;
  greybandHeight = 0;
  rotationArray: number[] = [];
  leave: boolean;
  initialLabel: string;
  revealTimer: any;

  keyManager: FocusKeyManager<any>;
  @ViewChildren(LinkListComponent) items: QueryList<any>;
  

  ngOnInit() {
    this.linkList.forEach(() => {
      this.revealArray.push(false);
      this.rotationArray.push(0);
    });
  }

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

  onReveal(index: number, show?: boolean) {
      if(show !== undefined) {
        this.revealArray[index] = show;
        this.rotationArray[index] = show === false ? 180 : 0;
      } else {
        this.revealArray[index] = !this.revealArray[index];
        this.rotationArray[index] = (this.rotationArray[index] === 0 ? 180 : 0);
      }
      setTimeout(() => {
        this.greybandHeight = this.linkListHolder.nativeElement.offsetHeight;
      }, 5);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.stopImmediatePropagation();

      this.keyManager.onKeydown(event);
      this.focus();

      if(event.key === 'ArrowUp'
        && this.keyManager.activeItemIndex > -1) {
        this.onReveal(this.keyManager.activeItemIndex + 1, false);
      } else if(event.key === 'ArrowDown'
                && this.keyManager.activeItemIndex < this.linkList.length) {
        this.onReveal(this.keyManager.activeItemIndex - 1, false);
      }
      return false;
    }
    if(event.key === 'Tab') {
      this.leave = true;
      setTimeout(() => { this.leave = false; }, 10);
    }
  }

  focus() {
    if(!this.keyManager.activeItem) {
      this.keyManager.setFirstItemActive();
    }
    this.onReveal(this.keyManager.activeItemIndex, true);
    setTimeout(() => { this.keyManager.activeItem.focusAbove(); }, 5);
  }

}
