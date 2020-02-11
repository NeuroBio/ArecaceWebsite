import { Component, OnInit } from '@angular/core';
import { CRUDcontrollerService } from '../../services/CRUDcontroller.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  constructor(private controller: CRUDcontrollerService) { }

  ngOnInit() {
    this.controller.assignFirePaths({Nomadic: 'Nomadic'}, 'Nomadic');
    this.controller.assignButtons([true, true, true, true]);
    this.controller.assignItemList(this.controller.firePaths.value['Nomadic']);
  }

}
