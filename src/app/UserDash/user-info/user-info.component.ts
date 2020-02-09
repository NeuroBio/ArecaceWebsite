import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Classes/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input() user: User;
  
  constructor() { }

  ngOnInit() {
  }

  changeUserName() {

  }
}
