import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-display',
  templateUrl: './main-display.component.html',
  styleUrls: ['./main-display.component.css']
})

export class MainDisplayComponent implements OnInit{

  @Input() current: string;
  @Input() labels: string[];
  @Input() linkList: string[][][];

  ngOnInit(){
    window.scroll(0,0);
  }

}
