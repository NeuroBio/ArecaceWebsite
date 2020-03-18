import { Component, OnInit, Input } from '@angular/core';
import { SliderService } from '../slider.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() name: string;
  @Input() flow: string = 'column';
  @Input() width: number = 90;
  preview: boolean;

  constructor(private sliderserv: SliderService) { }

  ngOnInit() {
    this.preview = this.sliderserv.getPreview();
  }

  changeView() {
    this.preview = !this.preview;
    this.sliderserv.setPreview(this.preview);
  }
}
