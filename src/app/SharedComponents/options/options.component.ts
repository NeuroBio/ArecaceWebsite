import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  @Input() labels: string[] = ["default", "Sub"];
  @Input() linkList: string[][][] = [ [ ["tester 1", "tester1"], ["tester 2", "tester2"], ["tester 3", "tester3"] ],
                                    [ ['subtester 1', 'subtester1'] ] ];
  @Input() current: string = "tester2";

  width: any;

  constructor() {
  }

  ngOnInit() {
    this.onResize();
  }

  @HostListener('window:resize') 
  onResize(){
    this.width = window.innerWidth;
    }
}
