import { Component, OnInit, OnDestroy } from '@angular/core';
import { CRUDcontrollerService } from '../../services/CRUDcontroller.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-formButtons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit, OnDestroy {

  allowUpdateAll: boolean;
  allowDelete: boolean;
  allowSubmit: boolean;
  allowReset: boolean;
  message: string;
  action: string;

  stream1: Subscription;
  stream2: Subscription;
  stream3: Subscription;
  stream4: Subscription;

  constructor(private controller: CRUDcontrollerService) { }

  ngOnInit() {
    this.stream1 = this.controller.allowButtons.subscribe(array =>{
      this.allowSubmit = array.submit;
      this.allowReset = array.reset;
      this.allowDelete = array.delete;
      this.allowUpdateAll = array.updateAll;
    })
    // this.stream1 = this.controller.allowUpdateAll.subscribe(bool => this.allowUpdateAll = bool);
    // this.stream2 = this.controller.allowDelete.subscribe(bool => this.allowDelete = bool);
    // this.controller.allowSubmit.subscribe(bool => this.allowSubmit = bool);
    // this.controller.allowReset.subscribe(bool => this.allowReset = bool);
    this.stream3 = this.controller.itemToEdit.subscribe(data => {
      this.action = data === undefined ? "Submit" : "Edit"
    });
    this.stream4 = this.controller.message.subscribe(string => this.message = string);
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.stream3.unsubscribe();
    // this.stream4.unsubscribe();
  }

  onSubmit() {
    if (this.action === "Submit") {
      this.controller.onSubmit();
    } else {
      this.controller.onEdit();
    }
  }

  onDelete() {
    this.controller.onDelete();
  }

  onUpdateAll() {
    this.controller.onUpdateAll();
  }

  onReset() {
    this.controller.itemToEdit.next(undefined);
  }


}
