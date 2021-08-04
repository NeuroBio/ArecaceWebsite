import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { SurveyService } from '../survey.service';

import { SurveyQuestion, SurveyOutcome } from 'src/app/Classes/ContentClasses';

@Component({
  selector: 'app-survey-display',
  templateUrl: './survey-display.component.html',
  styleUrls: ['./survey-display.component.css']
})

export class SurveyDisplayComponent implements OnInit {

  Questions: SurveyQuestion[];
  Name: string;
  answers: FormArray;
  Form: FormGroup;
  surveyResult: SurveyOutcome;

  constructor(private fb: FormBuilder,
              private surveyserv: SurveyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { Survey: any }) => {
      window.scroll(0, 0);
      this.Questions = this.surveyserv.assignSurveyData(data.Survey);
      this.Name = data.Survey.Name;
      this.onReset();
      this.Questions.forEach((_, index) => this.addQuestion(index));
      this.surveyserv.showSurvey.next(true);
    });
  }

  createForm() {
    return this.fb.group({
      Answers: this.answers
    });
  }

  addQuestion(index: number) {
    const object = {};
    object[`Answer${index}`] = ['', Validators.required];
    this.answers.push(this.fb.group(object));
  }

  onSubmit() {
    let Answers = this.Form.controls.Answers.value;
    Answers = Answers.map((ans, index) => {
      return { Answer: ans[`Answer${index}`] };
    });
    this.surveyserv.calculateFinalScores(Answers);
  }

  onReset() {
    this.answers = this.fb.array([]);
    this.Form = this.createForm();
  }

}
