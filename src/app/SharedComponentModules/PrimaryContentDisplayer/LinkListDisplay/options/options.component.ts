import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { GlobalVarsService }                      from 'src/app/GlobalServices/global-vars.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  @Input() labels: string[] = ["default", "Sub"];
  @Input() linkList: string[][][] = [ [ ["tester 1", "tester1"], 
                                        ["tester 2", "tester2"],
                                        ["tester 3", "tester3"] ],
                                    [ ['subtester 1', 'subtester1'] ] ];
  @Input() current: string = "tester2";

  width: any;
  mobile: boolean;
  height: number;

  constructor(public global: GlobalVarsService) { }

  ngOnInit() {
    this.onResize();
    this.mobile = this.global.phone.value;
  }

  @HostListener('window:resize') 
  onResize() {
    this.width = window.innerWidth;
    }
}
