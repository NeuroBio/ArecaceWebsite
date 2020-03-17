import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SliderService } from 'src/app/SharedComponentModules/slider/slider.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, OnDestroy {

  @Input() collect: any[];
  preview: boolean;
  stream: Subscription;
 
  constructor(private sliderserv: SliderService) {}
  ngOnInit() {
    this.stream = this.sliderserv.preview
      .subscribe(preview => this.preview = preview);
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

  
}
