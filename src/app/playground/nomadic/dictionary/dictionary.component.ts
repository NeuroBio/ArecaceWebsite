import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs';

import { Word } from '../../../Classes/NomadicLanguage';
import { NomadicService } from '../nomadic.service';


@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html'
})
export class DictionaryComponent implements OnInit, OnDestroy {

  Dictionary: Word[];
  stream: Subscription;

  constructor(private nomadserv: NomadicService,
              private titleserv: Title) { }

  ngOnInit() {
    this.titleserv.setTitle('Nomadic: Dictionary');
    this.stream = this.nomadserv.RawDictionary
      .subscribe(dict => this.Dictionary = dict);
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

}
