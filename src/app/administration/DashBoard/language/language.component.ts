import { Component, OnInit, OnDestroy } from '@angular/core';
import { CRUDcontrollerService } from '../../services/CRUDcontroller.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit, OnDestroy {

  simple = true;
  disableSwitchWord = false;
  stream: Subscription;

  constructor(private controller: CRUDcontrollerService) { }

  ngOnInit() {
    this.controller.assignFirePaths({Nomadic: 'Nomadic'}, 'Nomadic');
    this.controller.assignButtons([true, true, true, false]);
    this.controller.assignItemList(this.controller.firePaths.value['Nomadic']);
    this.controller.updateButton('Delete', true);
    this.stream = this.controller.itemToEdit.subscribe(word => {
      if(word) {
        this.simple = word.Level === 1;
        this.disableSwitchWord = true;
      } else {
        this.disableSwitchWord = false;
      }
    });
  }
   ngOnDestroy() {
     this.stream.unsubscribe();
   }

  pickWordType(simple: boolean) {
    this.simple = simple;
  }
}
