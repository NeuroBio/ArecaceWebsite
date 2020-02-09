import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CRUDcontrollerService } from 'src/app/administration/services/CRUDcontroller.service';
import { SurveyStatsService } from '../survey-stats.service';

@Component({
  selector: 'app-survey-stats',
  templateUrl: './survey-stats.component.html',
  styleUrls: ['../../Form.css']
})
export class SurveyStatsComponent implements OnInit , OnDestroy {

  Form: FormGroup;
  outcomes: FormArray;
  showSurveys: boolean;
  surveys: any[];

  stream1: Subscription;
  stream2: Subscription;
  stream3: Subscription;

  Tallies: number[];
  
  constructor(private fb: FormBuilder,
              private controller: CRUDcontrollerService,
              private statsserv: SurveyStatsService) { }
  
  ngOnInit() {
    this.stream1 = this.controller.itemToEdit
      .subscribe(item => this.assignFormData(Object.assign({}, item)));

    this.stream2 = this.controller.triggerProcess
      .subscribe(() => this.processForm());
    
    this.stream3 = this.statsserv.surveys.subscribe(surveys => {
      this.surveys = surveys});
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.stream3.unsubscribe();
  }

  createForm() {
    return this.fb.group({
      ID: '',
      Outcomes: this.outcomes
    });
  }

  assignFormData(editFormData: any) {
    this.onReset();
    if(editFormData) {
      this.controller.quickAssign(this.Form, editFormData);
      delete editFormData.ID;
      delete editFormData.key;
      Object.keys(editFormData).forEach(key => this.addOutcome(true, 0, key));
      this.Tallies = Object.values(editFormData);
    }
  }

  processForm() {
    let Final: any = {};
    this.outcomes.value.forEach((o, i) => {
      Final[o.Name] = this.Tallies[i] !== undefined ? this.Tallies[i] : 0;
    })
    Final.ID = this.Form.value.ID;

    this.controller.activeFormData.next([Final,
                                        [],
                                        [],
                                        [],
                                        undefined,
                                        undefined,
                                        undefined]);
  }

  onReset() {
    this.outcomes = this.fb.array([]);
    this.Form = this.createForm();
    this.showSurveys = false;
  }

  addOutcome(add: boolean, index: number, name: string = '') {
    if(add){
      this.outcomes.controls.push(this.fb.group({Name: name}));
    } else {
      this.outcomes.removeAt(index);
    }
  }

  setShowSurveys() {
    this.showSurveys = !this.showSurveys;
  }

  populateOutcomes(index: number) {
    this.outcomes.controls.forEach(() =>
      this.outcomes.removeAt(this.outcomes.length-1));
    this.surveys[index].Outcomes.forEach(o => {
      this.addOutcome(true, 0, o)
    })

    this.Form.patchValue({ID: this.surveys[index].ID})
  }
}