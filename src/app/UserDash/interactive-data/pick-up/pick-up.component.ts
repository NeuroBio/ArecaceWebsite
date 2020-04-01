import { Component, Input, OnChanges }  from '@angular/core';

import { DashCRUDService }              from '../../dash-CRUD.service';

import { User }                         from 'src/app/Classes/ContentClasses';
import { LinkList, LinkListElement } from 'src/app/SharedComponentModules/SmallComponents/LinkList/linklist';

@Component({
  selector: 'app-pick-up',
  templateUrl: './pick-up.component.html',
  styleUrls: ['./pick-up.component.css']
})

export class PickUpComponent implements OnChanges {

  @Input() user: User;
  data: {}[];
  dataExists: boolean;
  bookmarkTypes = ['Comics', 'Narratives', 'Scripts', 'Favorites'];
  
  constructor(private crud: DashCRUDService) { }

  ngOnChanges() {
    this.data = [];
    this.bookmarkTypes.forEach((bmt, i) => {
      if(this.user[bmt] && this.user[bmt][0]) {
        // this.data.push({});
        const LinkListArray = [];
        this.user[bmt].forEach((link, j) => {
          const List = new LinkList(link.name, [])
          const Delete = new LinkListElement(link.name, undefined, undefined, {Type: bmt, Index: j});
          const View = new LinkListElement(link.name, '/'+ link.path, undefined, undefined);
          List.Data.push(Delete);
          List.Data.push(View);
          LinkListArray.push(List)
        });
        this.data.push({Name: bmt, LinkList: LinkListArray});
      }
    });
    this.dataExists = this.data[0] ? true : false;
  }

  onDelete(type: string, index: number) {
    this.crud.deleteBookmark(index, type);
  }

}
