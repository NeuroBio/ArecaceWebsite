import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CRUDcontrollerService } from 'src/app/administration/services/CRUDcontroller.service';

@Component({
  selector: 'app-pageButton',
  templateUrl: './page-submit.component.html',
  styleUrls: ['./page-submit.component.css']
})
export class PageSubmitComponent implements OnInit {

  message: string;
  stream1: Subscription;

  constructor(private controller: CRUDcontrollerService) { }

  ngOnInit() {
    this.stream1 = this.controller.message.subscribe(string => this.message = string);
  }

  onSubmit() {
    this.controller.onEdit();
  }

}
