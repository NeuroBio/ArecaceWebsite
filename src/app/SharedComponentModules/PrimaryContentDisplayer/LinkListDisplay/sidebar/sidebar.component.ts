import { Component, Input, ViewChild, ElementRef,
         HostListener, ViewChildren, QueryList, AfterViewInit }        from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { UP_ARROW, DOWN_ARROW }                from '@angular/cdk/keycodes';
import { LinkListComponent } from '../link-list/link-list.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../options/options.component.css']
})

export class SideBarComponent implements AfterViewInit {


  @Input() labels: string[] = ["default", "Sub"];
  @Input() linkList: string[][][] = [ [ ["tester 1", "tester1"],
                                        ["tester 2", "tester2"],
                                        ["tester 3", "tester3"] ],
                                    [ ['subtester 1', 'subtester1'] ] ];
  @Input() current: string = "tester2";

  @ViewChild('container', { static: true }) container: ElementRef;
  @ViewChild('list', { static: true }) list: ElementRef;

  keyManager: FocusKeyManager<any>;
  @ViewChildren(LinkListComponent) items: QueryList<any>;
 
  style = true;
  listHeight = 0;
  greybarHeight = 0;
  resizeTimer: any;
  initialLabel: string;
  

  ngAfterViewInit() {
    this.onResize();
    this.keyManager = new FocusKeyManager(this.items)
    .withVerticalOrientation();
    this.onSelect(this.initialLabel);
    // this.keyManager.activeItem.selectItem();
  }

  @HostListener('window:scroll') 
  onResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      if(this.listHeight < this.list.nativeElement.offsetHeight
        && this.listHeight < window.innerHeight) {//allow appropriate growth
        this.listHeight = window.innerHeight -
        Math.max(this.container.nativeElement.getBoundingClientRect().top, 0);
        this.greybarHeight = this.container.nativeElement.scrollHeight;
      }

      setTimeout(() => {
        if(this.container.nativeElement.getBoundingClientRect().bottom > window.innerHeight) {
          this.listHeight += (window.innerHeight - this.container.nativeElement.getBoundingClientRect().bottom);
        }
        
        if(this.container.nativeElement.getBoundingClientRect().top < 0){
          this.listHeight = (this.container.nativeElement.getBoundingClientRect().height +
          this.container.nativeElement.getBoundingClientRect().top);
        }
      }, 3);
      
    }, 20);
  }

  onSelect(selected: string) {
    if(this.keyManager) {
      this.keyManager.setActiveItem(this.labels.findIndex(lab => lab === selected));
    } else {
      this.initialLabel = selected;
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
      this.keyManager.onKeydown(event);
      return false;
    }
  }

  focus() {
    this.keyManager.activeItem.focus();
  }
 
}
