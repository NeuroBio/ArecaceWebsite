import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Classes/user';

@Component({
  selector: 'app-pick-up',
  templateUrl: './pick-up.component.html',
  styleUrls: ['./pick-up.component.css']
})
export class PickUpComponent implements OnInit {

  comFrag: string[];
  scriFrag: string[];
  narFrag: string[];
  @Input() user: User;
  
  constructor() { }

  ngOnInit() {
    this.comFrag = this.user.Comic ? this.user.Comic.split('/') : [];
    this.scriFrag = this.user.Script ? this.user.Script.split('/') : [];
    this.narFrag = this.user.Narrative ? this.user.Narrative.split('/') : [];

  }

}
