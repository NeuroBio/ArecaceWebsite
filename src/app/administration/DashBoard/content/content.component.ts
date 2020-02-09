import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';

import { CRUDcontrollerService }          from '../../services/CRUDcontroller.service';
import { FirebasePaths } from 'src/app/Classes/FirebasePaths';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

export class ContentComponent implements OnInit {

  edit = false;
  
  constructor(private route: ActivatedRoute,
              private controller: CRUDcontrollerService) { }

  ngOnInit() {
    this.controller.assignFirePaths(new FirebasePaths());
    this.controller.assignButtons([true, true, true, true]);
    this.route.firstChild.url.subscribe(path =>
        this.controller.assignItemType(path[path.length-1].toString())
    );
  }
  
  onEditCheck(edit:boolean) {
    this.edit = edit;
  }

  onAllow(type:number) {
    if (type===0){
      this.controller.updateButton('Delete', false);
      this.controller.updateButton('UpdateAll', false);
    } else if(type===1) {
      this.controller.updateButton('Delete', true);
      this.controller.updateButton('UpdateAll', false);
    } else {
      this.controller.updateButton('Delete', false);
      this.controller.updateButton('UpdateAll', true);
    }
  }
  
}
