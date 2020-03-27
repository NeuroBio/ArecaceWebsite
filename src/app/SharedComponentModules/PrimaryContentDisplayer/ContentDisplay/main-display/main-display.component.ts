import { Component, Input, OnInit, OnDestroy }      from '@angular/core';

import { GeneralcollectionService }                 from 'src/app/GlobalServices/generalcollection.service';
@Component({
  selector: 'app-main-display',
  templateUrl: './main-display.component.html',
  styleUrls: ['./main-display.component.css']
})

export class MainDisplayComponent implements OnInit, OnDestroy {

  @Input() current: string;
  @Input() labels: string[];
  @Input() linkList: string[][][];

  constructor(private generalcollectserv: GeneralcollectionService) { }

  ngOnInit() {
    window.scroll(0,0);  
  }

  ngOnDestroy() {
    this.generalcollectserv.dispose();
  }
}
