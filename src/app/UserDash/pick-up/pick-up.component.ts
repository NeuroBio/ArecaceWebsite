import { Component, Input, OnChanges } from '@angular/core';
import { User } from 'src/app/Classes/ContentClasses';
import { DashCRUDService } from '../dash-CRUD.service';

@Component({
  selector: 'app-pick-up',
  templateUrl: './pick-up.component.html',
  styleUrls: ['./pick-up.component.css']
})
export class PickUpComponent implements OnChanges {

  @Input() user: User;
  data: any[];
  dataExists: boolean;
  bookmarkTypes = ['Comics', 'Narratives', 'Scripts', 'Favorites']  
  
  constructor(private crud: DashCRUDService) { }

  ngOnChanges() {
    this.data = [];
    this.dataExists = this.checkExistence()
    if(this.dataExists === true) {
      this.bookmarkTypes.forEach(bmt => {
        if(this.user[bmt]) {
          if(this.user[bmt][0]) {
            this.data.push({Type: bmt,
                            Data: this.user[bmt].map(link =>{
                              return {Link: link.path, Name: link.name};
            })});
          }
        }
      });  
    }
  }

  onDelete(type: string, index: number) {
    this.crud.deleteBookmark(index, type);
  }

  checkExistence() {
    for(let bmt of this.bookmarkTypes) {
      if(this.user[bmt]) {
        if(this.user[bmt][0]) {
          return true;
        };
      }
    }
    return false;
  }
}
