import { Component, OnInit, OnDestroy } from '@angular/core';
import { NomadicService } from '../nomadic.service';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})

export class TranslateComponent implements OnInit, OnDestroy {

  stream: Subscription;
  transdicts: any;
  keys: string[];
  translation: string;
  Form = this.createForm();


  constructor(private nomadserv: NomadicService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.stream = this.nomadserv.TranslationDictionary
    .subscribe(dicts => {
      this.transdicts = dicts
      this.keys = Object.keys(this.transdicts.NtoETrans);
    });
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

  createForm() {
    return this.fb.group({RawText: ''})
  }

  translate() {
    const translate = [];
    const words = this.Form.controls.RawText.value.split(' ');
    words.forEach(word => {
      const trans = this.transdicts.NtoETrans[word]
      if(trans){
        translate.push(`[${trans}]`);
      } else {
        translate.push('[?]')
      }
    });
    this.translation = translate.join(' ');
  }

}
