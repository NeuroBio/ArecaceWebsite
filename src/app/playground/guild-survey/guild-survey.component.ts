import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyQuestion } from './survey-question';

@Component({
  selector: 'app-guild-survey',
  templateUrl: './guild-survey.component.html',
  styleUrls: ['./guild-survey.component.css']
})
export class GuildSurveyComponent implements OnInit {

  questions: SurveyQuestion[] = [{Question: 'testing!', Answers: ['tan', "snek", 'prpr']},
  {Question: 'FREEEEEEEEEEEEEE?', Answers: ['Tega', "Lizard", 'Chocolate']}]
  answers = this.fb.array([]);
  Form = this.createForm();
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.questions.forEach(() => this.addQuestion());
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
    const answers = this.Form.value.Answers.map(x => x.Answer)
    console.log(answers)
  }
}
