import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashCRUDService } from '../../dash-CRUD.service';
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

  constructor(private crud: DashCRUDService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  onView(index: number) {
    this.router.navigate([`${this.type}/${this.data[index].ID}`], {relativeTo: this.route})
  }

  onEdit() {
    console.log("not wired")
  }

  onDelete(index: number) {
    this.crud.deleteEntry(this.type, index)
  }
}
