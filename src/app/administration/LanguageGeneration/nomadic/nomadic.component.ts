import { Component, OnInit } from '@angular/core';
import { Nomadic, Word } from '../rules';
@Component({
  selector: 'app-nomadic',
  templateUrl: './nomadic.component.html',
  styleUrls: ['./nomadic.component.css']
})
export class NomadicComponent implements OnInit {

  Nomadic = new Nomadic;
  Dictionary: Word[];
  newWords: string[];

  constructor() { }

  ngOnInit() {
    this.Dictionary = [new Word('a', 'a','noun', 1, 'a', 'NA'),
    new Word('b', 'b','noun', 1, 'b', 'NA')]
  }

  getWords(type: string, number: number, length?: number) {
    type='Verb';
    number=200;
    let NewWords = [];
    for(let i = 0; i < number; i++) {
      NewWords.push(this.Nomadic.makeWord(type, this.Dictionary, length));
    }
    this.newWords = NewWords;
  }

  loadWord(index: number) {
    console.log(this.Dictionary[index]);
  }
}
