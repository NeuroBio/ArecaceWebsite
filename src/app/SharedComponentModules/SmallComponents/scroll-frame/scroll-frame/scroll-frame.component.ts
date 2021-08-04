import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scroll-frame',
  templateUrl: './scroll-frame.component.html',
  styleUrls: ['./scroll-frame.component.css']
})
export class ScrollFrameComponent {

  @Input() Title: string;
  @Input() Color: string = '#454545';
  
}
