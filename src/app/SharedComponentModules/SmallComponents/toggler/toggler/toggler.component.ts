import { Component, Input, Output, EventEmitter }   from '@angular/core';

@Component({
  selector: 'app-toggler',
  templateUrl: './toggler.component.html',
  styleUrls: ['./toggler.component.css']
})

export class TogglerComponent {

  @Input() toggles: string[];
  @Input() togglerTitle: string;
  @Input() toggleName = this.togglerTitle;
  @Input() current: number = 0;
  @Input() visible: boolean = false;

  @Output() choiceEmitter = new EventEmitter<number>();

  emitChoice(index: number) {
    this.choiceEmitter.emit(index);
  }
}
