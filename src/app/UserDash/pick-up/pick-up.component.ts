import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Classes/user';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-pick-up',
  templateUrl: './pick-up.component.html',
  styleUrls: ['./pick-up.component.css']
})
export class PickUpComponent implements OnInit {

  @Input() user: User;
  data = [];
  bookmarkTypes = ['Comics', 'Narratives', 'Scripts']
  
  constructor(private userdataserv: UserDataService) { }

  ngOnInit() {
    this.bookmarkTypes.forEach(bmt => {
      if(this.user[bmt]) {
        this.data.push(this.processFragments(this.user[bmt]));
      }
    });
  }

  processFragments(data: string[]) {
    return data.map(link => {
      const frags = link.split('\/').map(frag =>
        frag.replace(/[A-Z\d]/g, char => ' ' + char).trim());
      return {link: link, frags: frags};
    });
  }

  onDelete(type: string, index: number) {
    this.userdataserv.deleteEntry(type, index);
  }
}
