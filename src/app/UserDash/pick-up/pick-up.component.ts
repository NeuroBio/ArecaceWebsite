import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User } from 'src/app/Classes/user';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-pick-up',
  templateUrl: './pick-up.component.html',
  styleUrls: ['./pick-up.component.css']
})
export class PickUpComponent implements OnChanges {

  @Input() user: User;
  data: any[];
  dataExists: boolean;
  bookmarkTypes = ['Comics', 'Narratives', 'Scripts']  
  
  constructor(private userdataserv: UserDataService) { }

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
    this.userdataserv.deleteEntry(type, index);
  }

  checkExistence() {
    for(let bmt of this.bookmarkTypes){
      if(this.user[bmt]){
        if(this.user[bmt][0]){
          return true;
        };
      }
    }
    return false;
  }
}
