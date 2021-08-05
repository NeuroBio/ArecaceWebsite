import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-toggler',
  templateUrl: './toggler.component.html',
  styleUrls: ['./toggler.component.css']
})

export class TogglerComponent implements OnInit {

  @Input() toggles: string[];
  @Input() togglerTitle: string;
  @Input() toggleName;
  @Input() current = 0;
  @Input() visible = false;

  @Output() choiceEmitter = new EventEmitter<number>();

  ngOnInit() {
    if (!this.toggleName) {
      this.toggleName = this.togglerTitle;
    }
  }

  emitChoice(index: number) {
    this.choiceEmitter.emit(index);
  }
}
