import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { DateInfo } from 'src/app/Classes/ArecacenDates';

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
  convertedDate = 'Qt1-1 12';

  constructor(private fb: FormBuilder,
              private titleserv: Title) { }

  ngOnInit() {
    this.titleserv.setTitle('Calc: Date');
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

  onSwitch(earth: string) {
    if(earth === 'earth') {
      this.months = this.dateInfo.EarthMonthNames;
      this.monthLengths = this.dateInfo.EarthMonthLengths;
    } else {
      this.months = this.dateInfo.ArecaceMonthNames;
      this.monthLengths = this.dateInfo.ArecaceMonthLengths;
    }
    this.Form.patchValue({Month: 0});
    this.onMonthChange(0);
  }

  onMonthChange(month: number) {
    this.days = new Array(this.monthLengths[month]);
    this.Form.patchValue({Day: 0});
    this.onAnyChange();
  }

  onAnyChange() {
    if (this.Form.value.Start === 'earth') {
      this.convertedDate = this.dateInfo.earthtoArecaceConverter(
        (+this.Form.value.Month) + 1, (+this.Form.value.Day) + 1);
    } else {
      const tempDate = this.dateInfo.arecacetoEarthConverter(
        this.dateInfo.ArecaceMonthNames[+this.Form.value.Month],
        (+this.Form.value.Day) + 1).split('-');
      this.convertedDate = `${this.dateInfo.EarthMonthNames[(+tempDate[0]) - 1]}-${tempDate[1]}`;
    }
  }

}
