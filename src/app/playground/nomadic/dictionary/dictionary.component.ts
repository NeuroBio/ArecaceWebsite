import { Component, OnInit, OnDestroy } from '@angular/core';
import { Word } from '../../../Classes/NomadicLanguage';
import { Subscription }                           from 'rxjs';
import { NomadicService } from '../nomadic.service';


@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit, OnDestroy {

  Dictionary: Word[];
  stream: Subscription;

  constructor(private nomadserv: NomadicService) { }

  ngOnInit() {
    this.stream = this.nomadserv.RawDictionary
      .subscribe(dict => this.Dictionary = dict);
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

}