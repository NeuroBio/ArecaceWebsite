import { Component, OnInit, OnDestroy } from '@angular/core';
import { Word } from '../../../Classes/rules';
import { FireBaseService } from '../../../GlobalServices/firebase.service';
import { Subscription }                           from 'rxjs';

@Component({
  selector: 'app-nomadic-home',
  templateUrl: './nomadic-home.component.html',
  styleUrls: ['./nomadic-home.component.css']
})
export class NomadicHomeComponent implements OnInit, OnDestroy {

  Dictionary: Word[];
  stream: Subscription;

  constructor(private firebaseserv: FireBaseService) { }

  ngOnInit() {
    this.stream = this.firebaseserv.returnCollect('Nomadic')
      .subscribe(dict => this.Dictionary = dict);
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

}
