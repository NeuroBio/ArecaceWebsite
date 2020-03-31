import { Component, Input, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-link-list-element',
  templateUrl: './link-list-element.component.html'
})

export class LinkListElementComponent implements OnInit {

    @Input() active: boolean;
    @Input() route: string;
    @Input() href: string;
    @Input() queryParamsHandling: string = '';
    @Input() index: number;

    @ViewChild('Host') Host: ElementRef;
    @Output() clickEventEmitter = new EventEmitter<number>();;
    Type: string;

    ngOnInit() {
      if(this.route !== undefined) { //within site
        this.Type = 'Route';
      } else if(this.href !== undefined && this.href !== '') { //link out
        this.Type = 'Href';
      } else { //no link out in a set of link outs
        this.Type = 'Div';
      }
    }

    selectItem() {
      this.Host.nativeElement.click();
    }

    focus() {
      this.Host.nativeElement.focus();
    }

    click() {
      this.clickEventEmitter.emit(this.index);
    }

}
