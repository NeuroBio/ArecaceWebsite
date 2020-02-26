import { Component, OnInit, Input } from '@angular/core';
import { DisplayService } from '../display.service';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private displayserv: DisplayService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  onView(index: number) {
    console.log(this.type)
    if(this.type ==='survey') {
      this.displayserv.viewData(this.data[index]);
    }
    this.router.navigate([`${this.type}`], {relativeTo: this.route})
    console.log("wired")
  }
}
