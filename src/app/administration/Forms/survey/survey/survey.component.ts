import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators, Form } from '@angular/forms';
import { CRUDcontrollerService } from 'src/app/administration/services/CRUDcontroller.service';
import { SurveyQuestion } from 'src/app/playground/guild-survey/survey-question';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['../../Form.css', './survey.component.css']
})

export class SurveyComponent implements OnInit , OnDestroy {

  questions = this.fb.array([]);
  Form: FormGroup;
  outcomeForm: FormGroup;
  results = this.fb.array([]);
  outcomes = this.fb.array([]);
  stream1: Subscription;
  stream2: Subscription;
  init = true;
  edit = false;
  editInd: number;
  resultsForm = this.createResultsForm();

   
  constructor(private fb: FormBuilder,
              private controller: CRUDcontrollerService) { }
  
  ngOnInit() {
    this.stream1 = this.controller.itemToEdit.subscribe(item => {
      this.assignFormData(item);
      this.init = false;
    });
    this.stream2 = this.controller.triggerProcess.subscribe(() => this.processForm());

    const questions: SurveyQuestion[] = [{Question: 'testing!', Answers: ['tan', "snek", 'prpr']},
                                        {Question: 'FREEEEEEEEEEEEEE?', Answers: ['Tega', "Lizard", 'Chocolate']}]
    const outcomes = [{Name:'Tega', Text: "tester"},
                      {Name:"Reptile", Text: "tester2"},
                      {Name: 'Kara', Text: "never gonna stop"}];

    const results = [ [{Tega: 1, Reptile: 0, Kara: 0} , {Tega: 0, Reptile: 1, Kara: .5}, {Tega: 0, Reptile: 0, Kara: 1}],
                      [{Tega: 1, Reptile: 0, Kara: 0} , {Tega: .5, Reptile: 1, Kara: .5}, {Tega: .5, Reptile: 0, Kara: 1}]
                    ]

    outcomes.forEach(o => this.outcomes.push(this.fb.group({Name: o.Name, Text: o.Text})));
    // this.questions = this.fb.array([this.fb.group({0:1}),this.fb.group({0:1})]);
    questions.forEach((q,i) => this.addQuestion(true, q.Question, q.Answers, results[i]));
    // console.log(this.Form.controls.Questions)
    // console.log(this.questions.controls[0].value)
    this.Form = this.createForm();
    this.outcomeForm = this.creatOutcomeForm();
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
  }

  createForm() {
    return this.fb.group({
      ID: '',
      Questions: this.questions,
      // Results: this.results,
    });
  }
  createResultsForm(){
    return this.fb.group({
      Results: this.results
    });
  }

  creatOutcomeForm() {
    return this.fb.group({
      Name: ['', Validators.required],
      Text: ['', Validators.required]
    });
  }

  assignFormData(editFormData: any) {
    if(editFormData) {
      this.onReset();
      this.Form = this.controller.quickAssign(this.Form, editFormData);
    } else if(!this.init) {
      this.onReset();
    }
  }
  
  assignOutcomeForm(index: number) {
    this.editInd = index;
    this.edit = true;
    const temp = this.outcomes.controls[index]
    this.outcomeForm.patchValue({
      Name: temp.value.Name,
      Text: temp.value.Text
    })
  }
  
  processForm() {
    const Final: SurveyQuestion = Object.assign({}, this.Form.value);

    this.controller.activeFormData.next([Final,
                                        [],
                                        [],
                                        [],
                                        undefined,
                                        undefined,
                                        undefined]);
  }

  onReset() {
      this.Form = this.createForm();
      this.onResetOutcomes();
  }

  onResetOutcomes() {
    this.outcomeForm = this.creatOutcomeForm();
    this.edit = false;
  }

  addOutcome(add: boolean) {
    const formData = Object.assign({}, this.outcomeForm.value);
    if(add){
      if(this.edit) {
        const oldName = this.outcomes.controls[this.editInd].value.Name;
        this.outcomes.controls[this.editInd].setValue({
          Name: formData.Name,
          Text: formData.Text
        });

        if(oldName !== formData.Name){
          this.results.controls.forEach((question, i) => {
            let temp = (<FormArray>question.get('Results'))
            temp.controls.map((answer: FormGroup) => {
              let oldValue = answer.value[oldName];
              answer.removeControl(oldName);
              answer.addControl(formData.Name, new FormControl(oldValue));
            })
            this.results.removeAt(0)
            this.results.push(this.fb.group({Results: temp}));
          });
        }
      } else {
        this.outcomes.push(this.fb.group({
          Name: formData.Name,
          Text: formData.Text
        }));

        this.results.controls.forEach((question, i) => {
          let temp = (<FormArray>question.get('Results'))
          temp.controls.map((answer: FormGroup) =>
            answer.addControl(formData.Name, new FormControl(0)) )
          this.results.removeAt(0)
          this.results.push(this.fb.group({Results: temp}));
        });
      }
    } else {
      const index = this.outcomes.controls.findIndex(ctr => ctr.value.Name == formData.Name);
      
      this.outcomes.removeAt(index);

      this.results.controls.forEach((question, i) => {
        let temp = (<FormArray>question.get('Results'))
        temp.controls.map((answer: FormGroup) =>
          answer.removeControl(formData.Name) )
        this.results.removeAt(0)
        this.results.push(this.fb.group({Results: temp}));
      });
    }
    this.onResetOutcomes();
    console.log(this.results.value)
  }

  addQuestion(add: boolean, question: string = '',
              answers: string[] = [], results: any[] = []) {
    if(add){
      this.questions.controls.push(this.fb.group({
                              Question: question,
                              Answers: this.createAnswers(answers)}
      ));
      this.results.controls.push(this.fb.group({
                              Results: this.createResult(answers, results)}));
    } else {
      this.questions.removeAt(this.questions.length-1);
      this.results.removeAt(this.results.length-1);
    }
  }

  createAnswers(answers: string[] = []) {
    let newAnswers =  this.fb.array([]);
    answers.forEach((ans) =>
      newAnswers.push(this.fb.group({Answer: ans})));
    return newAnswers;
  }

  addAnswer(add: boolean, index: number, answer: string = ''){
    const tempAnswer = <FormArray>this.questions.controls[index].get('Answers');
    const tempResult = <FormArray>this.results.controls[index].get('Results');
    if(add){
      tempAnswer.controls.push(this.fb.group({Answer: answer}));
      tempResult.push(this.createResultValues({}));
    } else {
      tempAnswer.removeAt(tempAnswer.length-1);
      tempResult.removeAt(tempResult.length-1);
    }
  }

  createResult(answers: string[] = [], results: object[] = []) {
    let newResults = this.fb.array([])
    answers.forEach((ans, i) => {
      newResults.push(this.createResultValues(results[i]));
    });
    return newResults;
  }

  createResultValues(results: object) {
    let newOutcomes = this.fb.group({})
    this.outcomes.controls.forEach((o: FormGroup, i) => {
      if(o.value.Name in results){
        newOutcomes.addControl(o.value.Name, new FormControl(results[o.value.Name]));
      } else {
        newOutcomes.addControl(o.value.Name, new FormControl(0));
      }
    });
    return newOutcomes;
  }

}
