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
      this.editserv.allowDelete.next(false);
      this.editserv.allowEditAll.next(false);
    }else if(type===1){
      this.editserv.allowDelete.next(true);
      this.editserv.allowEditAll.next(false);
    }else{
      this.editserv.allowDelete.next(false);
      this.editserv.allowEditAll.next(true);
    }
  }
  
}
