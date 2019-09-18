import { Component, OnInit, HostListener,
          ViewChild, ElementRef, Input }           from '@angular/core';
import { Router }           from '@angular/router';
import { Location }                         from '@angular/common';

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

  @ViewChild('left') left: ElementRef;
  @ViewChild('right') right: ElementRef;
  @ViewChild('bigger') bigger: ElementRef;
  textHeight: number;

  constructor(private router: Router,
              private location: Location,
              private global: GlobalVarsService) { }

  ngOnInit() {
    this.activeMember = this.linksList[this.index];
    this.bigUrl = this.activeMember.Links[1];
    this.loading = this.global.ImagesLoadable;
      setTimeout(() => { this.onResize() }, 10);
  }

  onResize(){
    console.log("trigger")
    this.loading = false;
    setTimeout(() =>{
      this.textHeight = this.bigger.nativeElement.offsetHeight - 30;
      if(this.textHeight < 600){
        this.textHeight = 600;
      }
    }, 10)
    
  }      

  onArrow(incre:number){
    this.loading = this.global.ImagesLoadable;
    this.index += incre;
    if(this.index === -1){
      this.index = this.linksList.length-1;
    }else if(this.index === this.linksList.length){
      this.index = 0;
    }

    this.activeMember = this.linksList[this.index]    
    this.bigUrl = this.activeMember.Links[1];
    this.location.go(`${this.gridPath}/${this.activeMember.ID}`);
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
