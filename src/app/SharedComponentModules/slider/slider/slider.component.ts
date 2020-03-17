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
  preview: boolean;

  constructor(private sliderserv: SliderService) { }

  ngOnInit() {
    this.preview = this.sliderserv.getPreview();
    console.log(this.preview)
  }

  changeView() {
    this.preview = !this.preview;
    this.sliderserv.setPreview(this.preview);
  }
}
