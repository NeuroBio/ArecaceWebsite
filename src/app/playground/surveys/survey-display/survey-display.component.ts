import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { SurveyQuestion, SurveyData, SurveyOutcome } from '../surveyclasses';
import { Observable, Subscription } from 'rxjs';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { map, take } from 'rxjs/operators';
import { SurveyService } from '../survey.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey-display',
  templateUrl: './survey-display.component.html',
  styleUrls: ['./survey-display.component.css']
})
export class SurveyDisplayComponent implements OnInit {

  Questions: SurveyQuestion[];
  Name: string;
  answers: FormArray
  Form: FormGroup;
  surveyResult: SurveyOutcome;

  constructor(private fb: FormBuilder,
              private surveyserv: SurveyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: {Survey: any})=>{
      window.scroll(0,0);
      this.Questions = this.surveyserv.assignSurveyData(data.Survey);
      this.Name = data.Survey.Name;
      this.onReset()
      this.Questions.forEach(() => this.addQuestion());
      this.surveyserv.showSurvey.next(true);
    });
  }
 
  createForm() {
    return this.fb.group({
      Answers: this.answers
    });
  }

  addQuestion(){
    this.answers.push(this.fb.group({Answer: ['', Validators.required]}));
  }

  onSubmit() {
  this.surveyserv.calculateFinalScores(
    this.Form.controls.Answers.value)
  }

  onReset() {
    this.answers = this.fb.array([]);
    this.Form = this.createForm();
  }

}
