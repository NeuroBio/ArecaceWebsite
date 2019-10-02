import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SurveyQuestion, SurveyData, SurveyOutcome } from './survey-question';
import { Observable } from 'rxjs';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { map } from 'rxjs/operators';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-survey-display',
  templateUrl: './survey-display.component.html',
  styleUrls: ['./survey-display.component.css']
})
export class SurveyDisplayComponent implements OnInit {

  questions: SurveyQuestion[];// = [{Question: 'testing!', Answers: ['a', "b", 'c']},
  //{Question: 'Testing 2!', Answers: ['d', "e", 'f']}]
  outcomes: SurveyOutcome[];
  results: object[][];
  maxScores: object;
  answers = this.fb.array([]);
  Form = this.createForm();
  survey$: Observable<SurveyData>
  surveyResult: SurveyOutcome;
  match: number;
  
  constructor(private fb: FormBuilder,
              private firebaseserv: FireBaseService,
              private surveyserv: SurveyService) { }

  ngOnInit() {
    this.survey$ = this.firebaseserv.returnCollect('Surveys').pipe(map(x => {
      return {Questions: JSON.parse(x[0].Questions),
              Results: JSON.parse(x[0].Results),
              Outcomes: JSON.parse(x[0].Outcomes),
              MaxScores: JSON.parse(x[0].MaxScores)}
    }));

    this.survey$.subscribe(survey => {
      this.questions = survey.Questions;
      this.results = survey.Results;
      this.outcomes = survey.Outcomes;
      this.maxScores = survey.MaxScores;
      survey.Questions.forEach(() => this.addQuestion());
    })
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
    this.Form.controls.Answers.value,
    this.outcomes, this.results, this.maxScores)

    // let finalOutcome = outcomes[0];
    // outcomes.forEach(key => {
    //   if(finalScores[finalOutcome] < finalScores[key]){
    //     finalOutcome = key;
    //   }
    // })

    // this.surveyResult = this.outcomes.find(o => o.Name === finalOutcome);
    // this.match = Math.trunc(finalScores[finalOutcome]*1000)/10;
  }
}
