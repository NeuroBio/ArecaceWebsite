import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription }                 from 'rxjs';

import { CRUDcontrollerService }                  from '../../services/CRUDcontroller.service';
import { FileHierarchy, Hier }          from '../../../Classes/filehierarchy';


@Component({
  selector: 'app-editlist',
  templateUrl: './editlist.component.html',
  styleUrls: ['./editlist.component.css']
})

export class EditListComponent implements OnInit, OnDestroy {
  
  filehier = new FileHierarchy;
  subtype: string;
  typeData: Hier;
  folder: string;
  path: string[];
  type: string;

  selected: string;
  selectable: any[];
  loading: boolean = false;
  
  stream1: Subscription;
  stream2: Subscription;

  constructor(private editserv: CRUDcontrollerService) { }

  ngOnInit() {
    this.stream1 = this.editserv.itemType.subscribe(type => {
      this.editserv.assignEditItem(undefined);
      this.path = [];
      this.type = type;
      this.typeData = this.filehier[type];
      this.selectable = undefined; 
      if(this.typeData.Terminal){
        this.getCollection(this.typeData.Path)
      }else{
        this.setSubtype(this.typeData.Path);
      }
    })
    
  }

  ngOnDestroy(){
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.editserv.assignEditItem(undefined);
  }

  setSubtype(subtype: string){
    this.path = [subtype];
    this.getCollection(this.path.join('/'))
  }


  onSelect(selected: string, ind: number){
    if(this.typeData.NextTypeFinal || this.path.length == 3){
      this.selected = selected;
      this.editserv.assignEditItem(this.selectable[ind])  
    }else{
      this.path.push(selected)
      this.path.push(selected)
      this.getCollection(this.path.join('/'))
    }
  }
  
  getCollection(path: string){
    this.stream2 = this.editserv.getEditableCollection(path).subscribe(
      collect => this.selectable = collect);
  }

}