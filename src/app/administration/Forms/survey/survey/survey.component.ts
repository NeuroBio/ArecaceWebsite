import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators, Form } from '@angular/forms';
import { CRUDcontrollerService } from 'src/app/administration/services/CRUDcontroller.service';
import { SurveyQuestion, SurveyOutcome } from 'src/app/playground/surveys/surveyclasses';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['../../Form.css', './survey.component.css']
})

export class SurveyComponent implements OnInit , OnDestroy {

  
  questions = this.fb.array([]);
  outcomes = this.fb.array([]);
  results = this.fb.array([]);

  mainForm = this.createForm();
  outcomeForm = this.creatOutcomeForm();
  resultsForm = this.createResultsForm();

 
  
  stream1: Subscription;
  stream2: Subscription;
  editOutcome = false;
  editInd: number;
  newSurvey: boolean;
   
  constructor(private fb: FormBuilder,
              private controller: CRUDcontrollerService) { }
  
  ngOnInit() {
    this.stream1 = this.controller.itemToEdit.subscribe(item => {
      this.assignFormData(item);
      this.newSurvey = false;
    });
    this.stream2 = this.controller.triggerProcess.subscribe(() => this.processForm());

    // const questions: SurveyQuestion[] = [{Question: 'testing!', Answers: ['tan', "snek", 'prpr']},
    //                                     {Question: 'FREEEEEEEEEEEEEE?', Answers: ['Tega', "Lizard", 'Chocolate']}]
    // const outcomes = [{Name:'Tega', Text: "tester"},
    //                   {Name:"Reptile", Text: "tester2"},
    //                   {Name: 'Kara', Text: "never gonna stop"}];
    // const results = [ [{Tega: 1, Reptile: 0, Kara: 0} , {Tega: 0, Reptile: 1, Kara: .5}, {Tega: 0, Reptile: 0, Kara: 1}],
    //                   [{Tega: 1, Reptile: 0, Kara: 0} , {Tega: .5, Reptile: 1, Kara: .5}, {Tega: .5, Reptile: 0, Kara: 1}]
    //                 ]
    // outcomes.forEach(o => this.outcomes.push(this.fb.group({Name: o.Name, Text: o.Text})));
    // questions.forEach((q,i) => this.addQuestion(true, q.Question, q.Answers, results[i]));
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
  }

  createForm() {
    return this.fb.group({
      ID: '',
      Name: '',
      Questions: this.questions,
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
      Text: ['', Validators.required],
      Link: '',
      LinkName: ''
    });
  }

  assignFormData(editFormData: any) {
    this.onReset();
    if(editFormData) {
      this.newSurvey = false
      this.mainForm = this.controller.quickAssign(this.mainForm, editFormData);
      const outcomes: SurveyOutcome[] = JSON.parse(editFormData.Outcomes);
      const questions: SurveyQuestion[] = JSON.parse(editFormData.Questions);
      const results = JSON.parse(editFormData.Results);
      outcomes.forEach(o => this.outcomes.push(this.fb.group({Name: o.Name, Text: o.Text,
                                                              Link: o.Link, LinkName: o.LinkName})));
      questions.forEach((q,i) => this.addQuestion(true, q.Question, q.Answers, results[i]));  
    } else {
      this.newSurvey = true;
    }
  }
  
  assignOutcomeForm(index: number) {
    this.editInd = index;
    this.editOutcome = true;
    this.controller.quickAssign(this.outcomeForm,
                                this.outcomes.controls[index].value)
  }
  
  processForm() {
    const ID = this.mainForm.controls.ID.value;
    const Name = this.mainForm.controls.Name.value;
    const Questions = this.unpackQuestions();
    const Results = this.unpackResults();
    const Outcomes: SurveyOutcome[] = this.outcomes.value;
    const MaxScores = this.calculateMaxScores(Results, Outcomes);
    const Final = {Questions: JSON.stringify(Questions),
                   Results: JSON.stringify(Results),
                   Outcomes: JSON.stringify(Outcomes),
                   MaxScores: JSON.stringify(MaxScores),
                   ID: ID,
                   Name: Name};
    this.controller.activeFormData.next([Final,
                                        [],
                                        [],
                                        [],
                                        undefined,
                                        undefined,
                                        undefined]);
  }

  onReset() {
    this.questions = this.fb.array([]);
    this.outcomes = this.fb.array([]);
    this.results = this.fb.array([]);
    this.mainForm = this.createForm();
    this.resultsForm = this.createResultsForm();
    this.onResetOutcomes();
  }

  onResetOutcomes() {
    this.outcomeForm = this.creatOutcomeForm();
    this.editOutcome = false;
    this.editInd = undefined;
  }

  addOutcome(add: boolean) {
    const formData = Object.assign({}, this.outcomeForm.value);
    const newData: FormArray[] =[];

    if(add){
      if(this.editOutcome) { //changing old outcome
        const oldName = this.outcomes.controls[this.editInd].value.Name;
        this.outcomes.controls[this.editInd].setValue({
          Name: formData.Name,
          Text: formData.Text,
          Link: formData.Link,
          LinkName: formData.LinkName
        });

        if(oldName !== formData.Name){ //old outcome name change
          this.results.controls.forEach((question, i) => {
            let temp = (<FormArray>question.get('Results'))
            temp.controls.map((answer: FormGroup) => {
              let oldValue = answer.value[oldName];
              answer.removeControl(oldName);
              answer.addControl(formData.Name, new FormControl(oldValue));
            })
            newData.push(temp);
          });
          this.repopulateResults(newData);
        }
      } else { //add new outcome
        this.outcomes.push(this.fb.group({
          Name: formData.Name,
          Text: formData.Text,
          Link: formData.Link,
          LinkName: formData.LinkName
        }));

        this.results.controls.forEach((question, i) => {
          let temp = (<FormArray>question.get('Results'))
          temp.controls.map((answer: FormGroup) =>
            answer.addControl(formData.Name, new FormControl(0)) )
            newData.push(temp);
        });
        this.repopulateResults(newData);
      }
    } else { //remove outcome
      const index = this.outcomes.controls.findIndex(ctr => ctr.value.Name == formData.Name);
      
      this.outcomes.removeAt(index);
      this.results.controls.forEach((question, i) => {
        let temp = (<FormArray>question.get('Results'));
        temp.controls.map((answer: FormGroup) =>
          answer.removeControl(formData.Name) );
        newData.push(temp)
      });
      this.repopulateResults(newData);
    }
    this.onResetOutcomes();
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

  unpackQuestions() {
    let Q: SurveyQuestion[] = [];
    this.questions.controls.forEach(q => {
      let A: string[] = [];
      (<FormArray>q.get('Answers')).controls.forEach(a => A.push(a.value.Answer));
      Q.push({Question: q.value.Question,
              Answers: A});
    });
    return Q;
  }

  unpackResults() {
    let R: object[][] = [];
    this.results.controls.forEach(r => {
      let S: object[] = [];
      (<FormArray>r.get('Results')).controls.forEach(s => S.push(s.value));
      R.push(S);
    })
    return R;
  }

  calculateMaxScores(results: object[][], outcomes: SurveyOutcome[]) {
    let maxScores: object = {};
    outcomes.forEach(o => {
      maxScores[o.Name] = 0;
    })

    results.forEach(q =>
      Object.keys(maxScores).forEach(key =>{
        let temp: number[] = q.map(a => a[key]);
        maxScores[key] += +temp.reduce((a,b) => a > b ? a : b);
      }) )
      return maxScores;
  }

  repopulateResults(newData: FormArray[]) {
    this.results.controls.forEach((crt, i) => {
      this.results.removeAt(0);
      this.results.push(this.fb.group({Results: newData[i]}));
    });

  }
}
