import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyQuestion, SurveyData, SurveyOutcome } from './survey-question';
import { Observable } from 'rxjs';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-guild-survey',
  templateUrl: './guild-survey.component.html',
  styleUrls: ['./guild-survey.component.css']
})
export class GuildSurveyComponent implements OnInit {

  questions: SurveyQuestion[];// = [{Question: 'testing!', Answers: ['a', "b", 'c']},
  //{Question: 'Testing 2!', Answers: ['d', "e", 'f']}]
  outcomes: SurveyOutcome[];
  results: object[][];
  maxScores: object[];
  answers = this.fb.array([]);
  Form = this.createForm();
  survey$: Observable<SurveyData>
  
  constructor(private fb: FormBuilder,
              private firebaseserv: FireBaseService) { }

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

    //Calculate scores
    let finalScores: object = {};
    this.outcomes.forEach(o => {
      finalScores[o.Name] = 0;
    });

    this.Form.value.Answers.forEach((q,i) =>{
      let temp = this.results[i][q.Answer]
      Object.keys(temp).forEach(key => finalScores[key] += +temp[key]);
    });

    console.log(finalScores);
    
  }
}
