import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../user-data.service';
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
  @Input() data: any;
  @Input() edit: any;

  constructor(private userdataserv: UserDataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  onView(index: number) {
    // if(this.type ==='SurveyResults') {
    //   this.displayserv.viewData(this.data[index]);
    // }
    this.router.navigate([`${this.type}/${this.data[index].ID}`], {relativeTo: this.route})
  }

  onEdit() {
    console.log("not wired")
  }

  onDelete(index: number) {
    this.userdataserv.deleteEntry(this.type, index)
  }
}
