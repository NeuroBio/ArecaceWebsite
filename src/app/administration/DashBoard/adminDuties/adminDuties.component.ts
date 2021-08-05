import { Component, OnDestroy } from '@angular/core';
import { CRUDcontrollerService } from '../../services/CRUDcontroller.service';

@Component({
  selector: 'app-admin-duties',
  templateUrl: './admin-duties.component.html',
})

export class AdminDutiesComponent implements OnDestroy {

  constructor(private controller: CRUDcontrollerService) {}

  ngOnDestroy() {
    this.controller.shutDown();
  }
}
