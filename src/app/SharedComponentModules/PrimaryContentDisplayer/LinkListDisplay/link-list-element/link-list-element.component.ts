import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-link-list-element',
  templateUrl: './link-list-element.component.html',
  styleUrls: ['../options/options.component.css']
})
export class LinkListElementComponent {

    @Input() item;
    @Input() active: boolean;
    @Input() route: string;
    @ViewChild('Host') Host: ElementRef;
        
    selectItem() {
      this.Host.nativeElement.click();
    }

    focus() {
      this.Host.nativeElement.focus();
    }
   
}
