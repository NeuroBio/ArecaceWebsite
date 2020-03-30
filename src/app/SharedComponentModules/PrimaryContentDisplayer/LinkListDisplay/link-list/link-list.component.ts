import { Component, OnInit, ViewChildren, EventEmitter,
         QueryList, AfterViewInit, Input, ElementRef,
         ViewChild, Output }                            from '@angular/core';
import { FocusKeyManager }                              from '@angular/cdk/a11y';

import { LinkListElementComponent }                     from 'src/app/SharedComponentModules/SmallComponents/link-list-element/link-list-element/link-list-element.component';


@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['../options/options.component.css']
})
export class LinkListComponent implements OnInit, AfterViewInit {

  @Input() current: string;
  @Input() list: string[];
  @Input() label: string;
  @Input() active: boolean;
  @Input() maxWidth: string = 'none'
  @Output() lableEmitter = new EventEmitter<string>();

  keyManager: FocusKeyManager<any>;
  @ViewChildren(LinkListElementComponent) items: QueryList<any>; // accessing the ListItemComponent(s) here
  @ViewChild('Host') Host: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.keyManager = new FocusKeyManager(this.items)
      .withHorizontalOrientation('ltr');
      this.setActive();
    }

    setActive() {
      if(this.current) {
        let count = 0;
          for(let element of this.list) {
            if(element[1] === this.current) {
              this.keyManager.setActiveItem(count);
              this.lableEmitter.emit(this.label);
              break;
            }
            count += 1;
          }
      }
    }

    handleKeyDown(event: KeyboardEvent) {
      if (this.keyManager) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.stopImmediatePropagation();
          this.keyManager.onKeydown(event);
          return false;
        } else if (event.key === 'Enter') {
          event.stopImmediatePropagation();
          this.keyManager.activeItem.selectItem();
          this.lableEmitter.emit(this.label);
          return false;
        }
      }
    }

    focus() {
      this.Host.nativeElement.focus();
      if(!this.keyManager.activeItem) {
        this.keyManager.setFirstItemActive();
      }
      this.keyManager.activeItem.focus();
    }
}

