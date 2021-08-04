import { Component, OnInit, OnDestroy,
         Input, ViewChild, ElementRef }         from '@angular/core';
import { FormBuilder, FormArray,
         FormGroup, Validators }                from '@angular/forms';

import { Subscription }                         from 'rxjs';

import { SourceAbilityCalculatorService }       from '../source-ability-calculator.service';
import { FetchService }                         from 'src/app/GlobalServices/fetch.service';
import { QuickAssign }                          from 'src/app/GlobalServices/commonfunctions.service';

import { AbilityData, AbilityMastery,
         AbilityNames }                         from '../SourceAbilityData';
import { CRUDdata }                             from 'src/app/Classes/ContentClasses';

@Component({
  selector: 'app-source-affinity-calculator',
  templateUrl: './source-affinity-calculator.component.html',
  styleUrls: ['./source-affinity-calculator.component.css']
})

export class SourceAffinityCalculatorComponent implements OnInit, OnDestroy {

  @Input() showName: boolean = true;
  @Input() viewOnly: boolean = false;
  @Input() new: boolean = true;

  @ViewChild('addAbilityButton') addAbilityButton: ElementRef;

  allowRemove = false;

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
  stream3: Subscription;

  constructor(private SAserv: SourceAbilityCalculatorService,
              private fb: FormBuilder,
              private fetcher: FetchService,
              private qa: QuickAssign) { }

  ngOnInit() {
    this.stream1 = this.fetcher.itemToEdit
      .subscribe(item => {
        this.assignData(item);
        if(this.viewOnly) {
          this.Form.get('Abilities').disable();
        }
      });
    this.stream2 = this.fetcher.processData
      .subscribe(() => this.onSubmit());
    this.stream3 = this.Form.valueChanges
      .subscribe(() => this.fetcher.assignvalidity(false));
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.stream3.unsubscribe();
  }

  createForm() {
    return this.fb.group({
      EsarianGenes: '0',
      ConnectionGenes: '0',
      Abilities: this.abilitiesArray,
      Name: ['', Validators.required]
    });
  }

  assignData(editFormData: any) {
    this.onReset();
    if(editFormData) {
      this.removeAbility(0);
      this.qa.assign(this.Form, editFormData);
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
    } catch(err) {
      this.error = err;
      return this.fetcher.activeFormData.next(
        new CRUDdata(true, 'Calculation failed!'));
    }

    this.rank = this.getRank(this.result, eGenes);
    
    if(this.showName === true) {//submissions are allowed

      if(this.Form.valid !== true) {
        this.error ='Name is required!';
        return this.fetcher.activeFormData.next(new CRUDdata(true, this.error));
      }
  
      const Final = {Build: JSON.stringify(build),
                      EsarianGenes: eGenes,
                      ConnectionGenes: cGenes,
                      Cost: this.result,
                      Rank: this.rank,
                      Name: this.Form.value.Name,
                      ID: ''};
      Final.ID = `${Final.Name}-(${Final.Cost})`;
      this.fetcher.assignvalidity(true);
      return this.fetcher.assignActiveFormData(new CRUDdata(false, '', Final));
    }
  }

  
  resetForm() {
    if(this.new === true) {
      this.fetcher.assignItemtoEdit(undefined);
    } else {
      this.fetcher.assignItemtoEdit(this.fetcher.itemToEdit.value);
    }
  }

  onReset() {
    this.abilitiesArray = this.fb.array([]);
    this.Form = this.createForm();
    this.addAbility();
    this.result = undefined;
    this.rank = undefined;
    this.error = undefined;
    this.fetcher.assignvalidity(this.Form.valid);
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

  addAbility(ability: string = 'EnergyGathering', mastery: number = 0) {
    this.abilitiesArray.push(this.fb.group({
        Ability: ability,
        Mastery: mastery
    }) );
    if(this.abilitiesArray.value.length > 1) {
      this.allowRemove = true;
    }
  }

  removeAbility(index: number) {
    this.abilitiesArray.removeAt(index);
    this.addAbilityButton.nativeElement.focus();
    if(this.abilitiesArray.value.length === 1) {
      this.allowRemove = false;
    }
  }
}
