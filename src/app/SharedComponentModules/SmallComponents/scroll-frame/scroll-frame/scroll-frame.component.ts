import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-scroll-frame',
  templateUrl: './scroll-frame.component.html',
  styleUrls: ['./scroll-frame.component.css']
})
export class ScrollFrameComponent implements OnInit {

  @Input() Title: string;
  @Input() Color: string = '#454545';
  
  constructor() { }

  ngOnInit() {
  }

}
