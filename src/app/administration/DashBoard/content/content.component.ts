import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';

import { CRUDcontrollerService }          from '../../services/CRUDcontroller.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

export class ContentComponent implements OnInit {

  edit:boolean = false;
  
  constructor(private route: ActivatedRoute,
              private editserv: CRUDcontrollerService) { }

  ngOnInit() { 
    this.route.firstChild.url.subscribe(path =>
        this.editserv.assignItemType(path[path.length-1].toString())
    );
  }
  
  onEditCheck(edit:boolean){
    this.edit=edit;
  }

  onAllow(type:number){
    if (type===0){
      this.editserv.updateButton('delete', false);
      this.editserv.updateButton('updateAll', false);
    }else if(type===1){
      this.editserv.updateButton('delete', true);
      this.editserv.updateButton('updateAll', false);
    }else{
      this.editserv.updateButton('delete', false);
      this.editserv.updateButton('updateAll', true);
    }
  }
  
}
