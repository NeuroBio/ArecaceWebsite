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
      this.controller.updateButton('delete', false);
      this.controller.updateButton('updateAll', false);
    } else if(type===1) {
      this.controller.updateButton('delete', true);
      this.controller.updateButton('updateAll', false);
    } else {
      this.controller.updateButton('delete', false);
      this.controller.updateButton('updateAll', true);
    }
  }
  
}
