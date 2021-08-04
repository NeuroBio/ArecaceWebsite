import { Component, Input, OnChanges,
         ViewChildren, ElementRef,
         ViewChild }                      from '@angular/core';

import { DashCRUDService }                from '../../dash-CRUD.service';

import { User }                           from 'src/app/Classes/ContentClasses';
import { LinkList, LinkListElement }      from 'src/app/SharedComponentModules/SmallComponents/LinkList/linklist';

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
  @ViewChildren('MasterLists') MasterLists:  any[];
  @ViewChild('None') None: ElementRef;
  
  constructor(private crud: DashCRUDService) { }

  ngOnChanges() {
    this.data = [];
    this.bookmarkTypes.forEach((bmt, i) => {
      if(this.user[bmt] && this.user[bmt][0]) {
        // this.data.push({});
        const LinkListArray = [];
        this.user[bmt].forEach((link, j) => {
          const List = new LinkList(link.name, [])
          const Delete = new LinkListElement('Delete', undefined, undefined, {Type: bmt, Name: link.name, Index: j});
          const View = new LinkListElement('View', '/'+ link.path, undefined, {Name: link.name});
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
    return this.crud.deleteBookmark(index, type)
    .then(() => {
      for(let i = 0; i < this.MasterLists['_results'].length; i++) {
        let Master = this.MasterLists['_results'][i];
        if(Master.MasterListName === type) {//correct list; still exists
          if(index > 0) {//not first
            Master.items['_results'][index-1].focus();
          } else {//first
            Master.items['_results'][index+1].focus();
          }
          return;
        }
      }
      //List no longer exists!
      if(this.MasterLists['_results'][0]) {
        this.MasterLists['_results'][0].focus();
      } else {
        this.None.nativeElement.focus();
      }
    });
  }

}
