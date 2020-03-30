import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pixel-soldier',
  templateUrl: './pixel-soldier.component.html',
  styleUrls: ['./pixel-soldier.component.css']
})
export class PixelSoldierComponent{

  @Input() pixel: any;
  @Input() active: boolean;
  @ViewChild('Host') Host: ElementRef;
  
  selectItem() {
    this.Host.nativeElement.click();
  }

  focus() {
    this.Host.nativeElement.focus();
  }
}
