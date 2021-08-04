import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-button',
  templateUrl: './image-button.component.html',
  styleUrls: ['./image-button.component.css']
})
export class ImageButtonComponent {

  @Input() Link: string;
  @Input() Src: string;
  @Input() Name: string;
  @Input() Size: number;

}
