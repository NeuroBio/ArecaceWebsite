import { Component, OnInit, OnDestroy }       from '@angular/core';
import { FormGroup, FormBuilder, FormArray }  from '@angular/forms';

import { Subscription }                       from 'rxjs';

import { CRUDcontrollerService }              from 'src/app/administration/services/CRUDcontroller.service';
import { SurveyStatsService }                 from '../survey-stats.service';
import { QuickAssign }                        from 'src/app/GlobalServices/commonfunctions.service';


import { CRUDdata }                           from 'src/app/Classes/ContentClasses';

@Component({
  selector: 'app-survey-stats',
  templateUrl: './survey-stats.component.html',
  styleUrls: ['../../Form.css']
})

export class SurveyStatsComponent implements OnInit , OnDestroy {

  Form: FormGroup;
  outcomes: FormArray;
  showSurveys: boolean;
  Old: boolean;
  surveys: any[];

  stream1: Subscription;
  stream2: Subscription;
  stream3: Subscription;

  Tallies: number[];
  
  constructor(private fb: FormBuilder,
              private controller: CRUDcontrollerService,
              private statsserv: SurveyStatsService,
              private qa: QuickAssign) { }
  
  ngOnInit() {
    this.stream1 = this.controller.itemToEdit
      .subscribe(item => this.assignFormData(item));

    this.stream2 = this.controller.triggerProcess
      .subscribe(() => this.processForm());
    
    this.stream3 = this.statsserv.surveys.subscribe(surveys => {
      this.surveys = surveys});
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.stream3.unsubscribe();
    this.controller.disposal();
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
      const safeCopy = Object.assign({}, editFormData);
      this.qa.assign(this.Form, safeCopy);
      delete safeCopy.ID;
      delete safeCopy.key;
      delete safeCopy.UploadTime;
      Object.keys(safeCopy).forEach(key => this.addOutcome(true, 0, key));
      this.Tallies = Object.values(safeCopy);
      this.Old = true;
    }
  }

  processForm() {
    let Final: any = {};
    this.outcomes.controls.forEach((o, i) => {
      if(this.Tallies) {
        Final[o.value.Name] = this.Tallies[i] !== undefined ? this.Tallies[i] : 0;
      } else {
        Final[o.value.Name] = 0;
      }
    })
    Final.ID = this.Form.value.ID;
    if(Final.ID === '') {
      return this.controller.activeFormData.next(
        new CRUDdata(true, 'Survey Stats must have at least an ID.'));
    }

    return this.controller.activeFormData.next(
      new CRUDdata(false, '', Final));
  }

  onReset() {
    this.outcomes = this.fb.array([]);
    this.Form = this.createForm();
    this.showSurveys = false;
    this.Old = false;
  }

  addOutcome(add: boolean, index: number, name: string = 'test') {
    if(add) {
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
    });

    this.Form.patchValue({ID: this.surveys[index].ID});
  }
}