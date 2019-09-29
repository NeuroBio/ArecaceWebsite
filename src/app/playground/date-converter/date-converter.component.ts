import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DateInfo } from 'src/app/Classes/datedata';

@Component({
  selector: 'app-date-converter',
  templateUrl: './date-converter.component.html',
  styleUrls: ['./date-converter.component.css']
})
export class DateConverterComponent implements OnInit {

  Form: FormGroup;
  dateInfo = new DateInfo();
  months = this.dateInfo.EarthMonthNames;
  monthLengths = this.dateInfo.EarthMonthLengths;
  days = new Array(this.monthLengths[0]);


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.onReset();
  }

  createForm() {
    return this.fb.group({
      Start: 'Earth',
      Month: 0,
      Day: 0
        });
  }

  onReset() {
    this.Form = this.createForm();
  }

  onSwitch(earth: boolean) {
    if(earth){
      this.months = this.dateInfo.EarthMonthNames;
      this.monthLengths = this.dateInfo.EarthMonthLengths;
      
    } else {
      this.months = this.dateInfo.ArecaceMonthNames;
      this.monthLengths = this.dateInfo.ArecaceMonthLengths;
    }
    this.onMonthChange(0);
  }

  onMonthChange(month: number) {
    console.log(month);
    this.days = new Array(this.monthLengths[month]);
  }

}
