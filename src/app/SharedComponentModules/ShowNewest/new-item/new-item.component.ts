import { Component, Input, ViewChildren, ElementRef } from '@angular/core';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent {

  @Input() item: any;
  @Input() active: boolean;
  @ViewChildren('Host') Host: ElementRef;
  
  selectItem() {
    this.Host.nativeElement.click();
  }

  focus() {
    this.Host.nativeElement.focus();
  }
}
