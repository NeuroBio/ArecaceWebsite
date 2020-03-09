import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashCRUDService } from '../../dash-CRUD.service';
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs';
import { FetchService } from 'src/app/GlobalServices/fetch.service';

@Component({
  selector: 'app-dash-buttons',
  templateUrl: './dash-buttons.component.html',
  styleUrls: ['./dash-buttons.component.css']
})

export class DashButtonsComponent implements OnInit, OnDestroy {

  message: string;
  disabled: boolean;
  stream1: Subscription;
  stream2: Subscription;
  stream3: Subscription;

  constructor(private route: ActivatedRoute,
              private crud: DashCRUDService,
              private fetcher: FetchService) { }

  ngOnInit() {
    this.stream1 = this.crud.message.subscribe(mess => this.message = mess);
    this.stream2 = this.fetcher.loading.subscribe(load => this.disabled = load);
    this.stream3 = this.fetcher.valid.subscribe(valid => this.disabled = !valid);
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.stream3.unsubscribe();
  }
  
  onEdit() {
    this.crud.editEntry(this.route.snapshot.url[0].path);
  }

  onDelete() {
  this.crud.deleteEntry(this.route.snapshot.url[0].path);
  }

}
