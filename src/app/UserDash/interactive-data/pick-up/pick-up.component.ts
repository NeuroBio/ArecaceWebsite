import { Component, Input, OnChanges }  from '@angular/core';

import { DashCRUDService }              from '../../dash-CRUD.service';

import { User }                         from 'src/app/Classes/ContentClasses';

@Component({
  selector: 'app-pick-up',
  templateUrl: './pick-up.component.html',
  styleUrls: ['./pick-up.component.css']
})

export class PickUpComponent implements OnChanges {

  @Input() user: User;
  data: any[];
  dataExists: boolean;
  bookmarkTypes = ['Comics', 'Narratives', 'Scripts', 'Favorites'];
  
  constructor(private crud: DashCRUDService) { }

  ngOnChanges() {
    this.data = [];
    this.bookmarkTypes.forEach(bmt => {
      if(this.user[bmt]) {
        if(this.user[bmt][0]) {
          this.data.push({ Type: bmt,
                           Data: this.user[bmt].map(link => {
                           return { Link: link.path, Name: link.name }; })
          });
        }
      }
    });
    this.dataExists = this.data[0] ? true : false;
  }

  onDelete(type: string, index: number) {
    this.crud.deleteBookmark(index, type);
  }

}
