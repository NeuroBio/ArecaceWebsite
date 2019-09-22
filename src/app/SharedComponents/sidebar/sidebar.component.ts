import { Component, Input, ViewChild, ElementRef, HostListener, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../options/options.component.css']
})

export class SideBarComponent implements AfterContentChecked{


  @Input() labels: string[] = ["default", "Sub"];
  @Input() linkList: string[][][] = [ [ ["tester 1", "tester1"], ["tester 2", "tester2"], ["tester 3", "tester3"] ],
                                    [ ['subtester 1', 'subtester1'] ] ];
  @Input() current: string = "tester2";
  @ViewChild('container') container: ElementRef;
  @ViewChild('list') list: ElementRef;
 
  style = true;
  height = 0;

  ngAfterContentChecked(){
    this.onResize();
  }
  
  @HostListener('window:scroll') 
  onResize(){
    if(this.height < this.list.nativeElement.offsetHeight){
      this.height = window.innerHeight -
      Math.max(this.container.nativeElement.getBoundingClientRect().top, 0)-3;
    }
  }

  onSelect(selected: string) {
    this.current = selected;
  }

 
}
