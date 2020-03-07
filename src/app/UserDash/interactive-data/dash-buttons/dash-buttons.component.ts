import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashCRUDService } from '../../dash-CRUD.service';
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dash-buttons',
  templateUrl: './dash-buttons.component.html',
  styleUrls: ['./dash-buttons.component.css']
})

export class DashButtonsComponent implements OnInit, OnDestroy {

  message: string;
  stream: Subscription;
  constructor(private route: ActivatedRoute,
              private crud: DashCRUDService) { }

  ngOnInit() {
    this.stream = this.crud.message.subscribe(mess => this.message = mess);
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }
  
  onEdit() {
    this.crud.editEntry(this.route.snapshot.url[0].path);
  }

  onDelete() {
  this.crud.deleteEntry(this.route.snapshot.url[0].path);
  }

}
