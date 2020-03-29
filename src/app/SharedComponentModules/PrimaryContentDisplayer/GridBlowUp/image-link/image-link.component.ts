import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-image-link',
  templateUrl: './image-link.component.html',
  styleUrls: ['./image-link.component.css']
})
export class ImageLinkComponent {

  @Input() item: any;
  @Input() active: boolean;
  @Input() preview: boolean;
  @ViewChild('Host') Host: ElementRef;
      
  selectItem() {
    this.Host.nativeElement.click();
  }

  focus() {
    this.Host.nativeElement.focus();
  }
 
}
