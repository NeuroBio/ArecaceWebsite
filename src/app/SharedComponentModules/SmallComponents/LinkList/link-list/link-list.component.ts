import { Component, ViewChildren, EventEmitter,
         QueryList, AfterViewInit, Input,
         ElementRef, ViewChild, Output, OnInit,
         ContentChild, TemplateRef }                    from '@angular/core';
import { FocusKeyManager }                              from '@angular/cdk/a11y';

import { LinkListElementComponent }                     from '../link-list-element/link-list-element.component';

import { LinkListElement }                              from '../linklist';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit, AfterViewInit {

  @Input() current: string;
  @Input() list: LinkListElement[];
  @Input() label: string;
  @Input() active: boolean;
  @Input() queryParamsHandling: string = '';

  @Output() lableEmitter = new EventEmitter<string>();

  keyManager: FocusKeyManager<any>;
  @ViewChildren(LinkListElementComponent) items: QueryList<any>;
  leave: boolean;

  @ViewChild('Host') Host: ElementRef;
  @ContentChild('Content') itemTemplateRef: TemplateRef<any>;
  @ContentChild('Decoration') decorationTemplateRef: TemplateRef<any>;

  ngOnInit() {
    this.leave = this.label ? true : false;
  }

  ngAfterViewInit() {
    this.keyManager = new FocusKeyManager(this.items)
      .withHorizontalOrientation('ltr');
  }

    setActive() {
      if(this.current) {
        let count = 0;
        for(let element of this.list) {
          if(element.Route === this.current) {
            this.keyManager.setActiveItem(count);
            if(this.label) {
              this.lableEmitter.emit(this.label);
            }
            return;
          }
          count += 1;
        }
      }
      
      return this.keyManager.setFirstItemActive();
    }

    handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.stopImmediatePropagation();
        this.keyManager.onKeydown(event);
        return false;
      }
      
      if (event.key === 'Enter') {
        event.stopImmediatePropagation();
        this.keyManager.activeItem.selectItem();
        if(this.label) {
          this.lableEmitter.emit(this.label);
        }
        return false;
      }

      if(!this.label) {
        if(event.key === 'Tab') {
          this.leave = true;
          setTimeout(() => { this.leave = false }, 10);
          return;
        }
      }

    }

    // handleKeyUp(event: KeyboardEvent) {
    //   console.log("keyup")
    //   if (event.key === 'Enter') {
    //     event.stopImmediatePropagation();
    //     this.keyManager.activeItem.selectItem();
    //     if(this.label) {
    //       this.lableEmitter.emit(this.label);
    //     }
    //     return false;
    //   }
    // }

    onClick(index: number) {
      this.keyManager.setActiveItem(index);
      if(this.label) {
        this.lableEmitter.emit(this.label);
      }
    }

    focusAbove() {
      this.Host.nativeElement.focus();
    }

    focus() {
      if(!this.keyManager.activeItem) {
        this.setActive();
      }
      this.keyManager.activeItem.focus();
    }
}

