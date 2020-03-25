import { Component, Input, ViewChild, ElementRef,
         HostListener, AfterContentChecked }        from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../options/options.component.css']
})

export class SideBarComponent implements AfterContentChecked{


  @Input() labels: string[] = ["default", "Sub"];
  @Input() linkList: string[][][] = [ [ ["tester 1", "tester1"],
                                        ["tester 2", "tester2"],
                                        ["tester 3", "tester3"] ],
                                    [ ['subtester 1', 'subtester1'] ] ];
  @Input() current: string = "tester2";

  @ViewChild('container', { static: true }) container: ElementRef;
  @ViewChild('list', { static: true }) list: ElementRef;
 
  style = true;
  listHeight = 0;
  greybarHeight = 0;

  ngAfterContentChecked() {
    setTimeout(() => { this.onResize() }, 10);
  }
  
  @HostListener('window:scroll') 
  onResize() {
    if(this.listHeight < this.list.nativeElement.offsetHeight){
      this.listHeight = window.innerHeight -
      Math.max(this.container.nativeElement.getBoundingClientRect().top, 0)-4;
      this.greybarHeight = this.container.nativeElement.scrollHeight;
    }
  }

  onSelect(selected: string) {
    this.current = selected;
  }

 
}
