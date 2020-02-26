import { Component, OnInit, Input } from '@angular/core';
import { DisplayService } from '../display.service';

@Component({
  selector: 'app-data-options',
  templateUrl: './data-options.component.html',
  styleUrls: ['./data-options.component.css']
})
export class DataOptionsComponent implements OnInit {

  @Input() names: string[];
  @Input() title: string;
  @Input() link: string;
  @Input() type: string;
  @Input() data: string;

  constructor(private displayserv: DisplayService) { }

  ngOnInit() {
  }

  onView(index: number) {
    console.log(this.type)
    if(this.type ==='survey') {
      this.displayserv.viewData(this.data[index]);
    }
    console.log("wired")
  }
}
