import { Component, OnInit, HostListener,
          ViewChild, ElementRef, Input }      from '@angular/core';
import { Router, ActivatedRoute }             from '@angular/router';

import { GlobalVarsService }                  from 'src/app/GlobalServices/global-vars.service';
import { GetRouteSegmentsService }            from 'src/app/GlobalServices/commonfunctions.service';
import { GridService }                        from '../refocus.service';

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
  path: string;

  @ViewChild('left', { static: true }) left: ElementRef;
  @ViewChild('right', { static: true }) right: ElementRef;
  @ViewChild('bigger', { static: true }) bigger: ElementRef;
  @ViewChild('back', { static: true }) back: ElementRef;
  textHeight: number;

  

  constructor(private router: Router,
              private route: ActivatedRoute,
              private getsegserv: GetRouteSegmentsService,
              private gridserv: GridService,
              private global: GlobalVarsService) { }

  ngOnInit() {
    this.back.nativeElement.focus();
    this.activeMember = this.linksList[this.index];
    this.bigUrl = this.activeMember.Links[1];
    this.loading = this.global.ImagesLoadable.value;
    setTimeout(() => { this.onResize() }, 10);
    this.setPath();
  }

  onResize() {
    setTimeout(() => {
      this.textHeight = this.bigger.nativeElement.offsetHeight - 30;
      if(this.textHeight < 400) this.textHeight = 400;
    }, 10);
  }

  onLoad() {
    this.loading = false;
  }

  showHideDescription() {
    this.showDescription = !this.showDescription;
    this.showDescription ? this.rotation = 0 : this.rotation = 270;
    this.onResize();
  }

  setPath() {
    const mainPath = this.getsegserv.fetch(this.route.snapshot.pathFromRoot);
    this.path = `${mainPath.join('/')}/${this.activeMember.ID}/Download`;
  }

  onArrow(incre: number) {
    const startIndex = this.index;
    this.loading = this.global.ImagesLoadable.value;
    this.index += incre;
    if(this.index === -1) {
      this.index = this.linksList.length-1;
    } else if(this.index === this.linksList.length) {
      this.index = 0;
    }

    if(this.index === startIndex) {
      this.loading = false;
    } else {
      this.activeMember = this.linksList[this.index];
      this.bigUrl = this.activeMember.Links[1];
      this.router.navigate([`${this.gridPath}/${this.activeMember.ID}`]);
      this.setPath();
    }
  }

  //Arrow keys (trigger arrow options)
  @HostListener('window:keyup', ['$event']) KeyEvent(event: KeyboardEvent) { 
    if(event.key === 'ArrowRight'){//right, next
      this.right.nativeElement.focus();
      this.onArrow(1);
    }

    if(event.key === 'ArrowLeft') {//left, prev
      this.left.nativeElement.focus();
      this.onArrow(-1);
    }

    if(event.key === 'Escape') {//escape
      this.router.navigate([`${this.gridPath}`]);
      this.gridserv.triggerRefocus();
    }
  }

  onTwistieKeydown(event: any) {
    if (event.key === "Enter") {
      this.showHideDescription();
    }
  }

  onArrowKeydown(event: any, change: number){
    if (event.key === "Enter") {
      this.onArrow(change);
    }
  }

}
