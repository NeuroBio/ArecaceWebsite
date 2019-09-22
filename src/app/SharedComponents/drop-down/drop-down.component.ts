import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { GeneralmemberresolverService } from 'src/app/GlobalServices/generalmemberresolver.service';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['../options/options.component.css',
              './drop-down.component.css']
})
export class DropDownComponent implements OnInit {

  @Input() labels: string[] = ["default", "Sub"];
  @Input() linkList: string[][][] = [ [ ["tester 1", "tester1"], ["tester 2", "tester2"], ["tester 3", "tester3"] ],
                                    [ ['subtester 1', 'subtester1'] ] ];
  @Input() current: string = "tester2";
  revealArray: boolean[] = [];
  @ViewChild('linkListHolder') linkListHolder: ElementRef;
  height = 0;
  rotationArray: number[] = [];
  
  constructor() { }

  ngOnInit() {
    this.labels.forEach(() => {
      this.revealArray.push(false);
      this.rotationArray.push(0);
    });
    
  }

  onSelect(selected: string) {
    this.current = selected; 
  }

  onReveal(index: number){
    this.revealArray[index] = !this.revealArray[index];
    setTimeout(() => {
      this.height = this.linkListHolder.nativeElement.offsetHeight;
    }, 10);
    this.rotationArray[index] =
      (this.rotationArray[index] === 0 ? 180 : 0);
  }
}
