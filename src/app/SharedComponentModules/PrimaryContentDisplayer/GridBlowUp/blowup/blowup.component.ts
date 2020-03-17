import { Component, OnInit, HostListener,
          ViewChild, ElementRef, Input }    from '@angular/core';
import { Router }                           from '@angular/router';

import { GlobalVarsService }                from 'src/app/GlobalServices/global-vars.service';

@Component({
  selector: 'app-blowup',
  templateUrl: './blowup.component.html',
  styleUrls: ['./blowup.component.css']
})

export class BlowUpComponent implements OnInit {


  @Input() linksList: any[];
  @Input() index: number;
  @Input() gridPath: string;

  bigUrl: string;
  activeMember: any;
  loading: boolean;
  showDescription = true;
  rotation = 0;

  @ViewChild('left', { static: true }) left: ElementRef;
  @ViewChild('right', { static: true }) right: ElementRef;
  @ViewChild('bigger', { static: true }) bigger: ElementRef;
  textHeight: number;

  @ViewChild('back', { static: true }) back: ElementRef;

  constructor(private router: Router,
              private global: GlobalVarsService) { }

  ngOnInit() {
    this.activeMember = this.linksList[this.index];
    this.bigUrl = this.activeMember.Links[1];
    this.loading = this.global.ImagesLoadable.value;
    setTimeout(() => { this.onResize() }, 10);
  }

  onResize(){
    this.loading = false;
    setTimeout(() => {
      this.textHeight = this.bigger.nativeElement.offsetHeight - 30;
      if(this.textHeight < 400){
        this.textHeight = 400;
      }
    }, 10)
    
  }

  showHideDescription() {
    this.showDescription = !this.showDescription;
    this.showDescription ? this.rotation = 0 : this.rotation = 270;
    this.onResize();
  }

  onArrow(incre:number){
    const startIndex = this.index;
    this.loading = this.global.ImagesLoadable.value;
    this.index += incre;
    if(this.index === -1){
      this.index = this.linksList.length-1;
    }else if(this.index === this.linksList.length){
      this.index = 0;
    }
    if(this.index === startIndex) {
      this.loading = false;
    } else {
      this.activeMember = this.linksList[this.index]    
      this.bigUrl = this.activeMember.Links[1];
      this.router.navigate([`${this.gridPath}/${this.activeMember.ID}`]);
    }
  }

  //Arrow keys (trigger arrow options)
  @HostListener('window:keyup', ['$event']) KeyEvent(event: KeyboardEvent){ 
    if(event.keyCode === 39){//right, next
      this.right.nativeElement.focus();
      this.onArrow(1);
    }

    if(event.keyCode === 37){//left, prev
      this.left.nativeElement.focus();
      this.onArrow(-1);
    }

    if(event.keyCode == 27){//escape
      this.router.navigate([`${this.gridPath}`]);
    }
  }

}
