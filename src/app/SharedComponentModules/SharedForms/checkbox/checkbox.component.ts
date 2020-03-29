import { Component, Input }   from '@angular/core';
import { FormGroup }          from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {

  @Input() controlName: string;
  @Input() labelName: string;
  @Input() formName: FormGroup;
  @Input() id: string = 'check';
  @Input() checked: boolean;
  @Input() before: boolean = true;

}
