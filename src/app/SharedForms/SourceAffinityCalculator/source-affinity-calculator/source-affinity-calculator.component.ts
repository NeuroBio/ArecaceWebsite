import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalculatorService } from '../calculator.service';
import { AbilityData, AbilityMastery, AbilityNames } from '../sourceclasses';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { FetchSAService } from 'src/app/administration/Forms/sourceaffinity/fetch-sa.service';
import { Subscription } from 'rxjs';
import { CRUDcontrollerService } from 'src/app/administration/services/CRUDcontroller.service';

@Component({
  selector: 'app-source-affinity-calculator',
  templateUrl: './source-affinity-calculator.component.html',
  styleUrls: ['./source-affinity-calculator.component.css']
})

export class SourceAffinityCalculatorComponent implements OnInit, OnDestroy {

  result: any;
  rank: string;
  abilitiesArray: FormArray;
  Form: FormGroup;
  error: string;
  mastery = ["Low", "Mid", "High", "Top"];
  abilityKeys = Object.keys(new AbilityData());
  abilityNames = new AbilityNames().Names;
  show = false;

  stream1: Subscription;
  stream2: Subscription;

  constructor(private SAserv: CalculatorService,
              private fb: FormBuilder,
              private fetcher: FetchSAService,
              private controller: CRUDcontrollerService) { }

  ngOnInit() {
    this.stream1 = this.controller.itemToEdit
      .subscribe(item => this.assignData(item));
    this.stream2 = this.fetcher.processData
      .subscribe(() => this.onSubmit());
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
  }

  createForm() {
    return this.fb.group({
      EsarianGenes: '0',
      ConnectionGenes: '0',
      Abilities: this.abilitiesArray
    });
  }

  assignData(editFormData: any) {
    this.onReset();
    if(editFormData){
      this.controller.quickAssign(this.Form, editFormData);
      const Build = JSON.parse(editFormData.Build);
      Build.forEach(abimas => this.addAbility(abimas.Ability, abimas.Mastery));
      this.rank = editFormData.Rank;
      this.result = editFormData.Cost;
    }
  }

  onSubmit() {
    this.result = undefined;
    this.rank = undefined;
    this.error = undefined;
    const build: AbilityMastery[] = [];
    this.abilitiesArray.controls.forEach(abimas =>
      build.push(new AbilityMastery(abimas.value.Ability, +abimas.value.Mastery)));
    const eGenes = this.Form.controls.EsarianGenes.value;
    const cGenes = this.Form.controls.ConnectionGenes.value;

    try {
      this.result = this.SAserv.calculateAffinity(build, eGenes, cGenes);
    }
    catch(err) {
      this.error = err;
    }
    this.rank = this.getRank(this.result, eGenes);
    this.fetcher.activeFormData.next({ Build: JSON.stringify(build),
                                       EsarianGenes: eGenes,
                                       ConnectionGenes: cGenes,
                                       Cost: this.result,
                                       Rank: this.rank});
  }

  onReset() {
    this.abilitiesArray = this.fb.array([]);
    this.Form = this.createForm();
    this.addAbility();
    this.result = undefined;
    this.rank = undefined;
    this.error = undefined;
  }

  onShow() {
    this.show = !this.show;
  }

  getRank(cost: number, eGenes:number = 0) {
    if(cost < 5 - 5*eGenes){ //0
      return 'Sourceless';
    } else if(cost < 10 - 5*eGenes) { //5
      return 'Below Average';
    } else if (cost < 20 - 10*eGenes) { //10
      return 'Average';
    } else if (cost < 30 - 10*eGenes) { //20
      return 'Above Average';
    } else if (cost < 40 - 10*eGenes) { //30
      return 'Impressive';
    } else if (cost < 50) {
      return 'Top Tier';
    } else {
      return "OP, pls nerf.";
    }
  }

  addAbility(ability: string = 'EnergyGathering', mastery: number = 0){
      this.abilitiesArray.push(this.fb.group({
        Ability: ability,
        Mastery: mastery
      }));
  }

  removeAbility(index: number) {
    this.abilitiesArray.removeAt(index);
  }
}
