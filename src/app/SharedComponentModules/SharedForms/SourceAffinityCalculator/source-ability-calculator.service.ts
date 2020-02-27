import { Injectable } from '@angular/core';
import { RelatednessMatrix, AbilityData, AbilityMastery } from './SourceAbilityData';

@Injectable({
  providedIn: 'root'
})

export class SourceAbilityCalculatorService {

  Related = new RelatednessMatrix ();
  SAData = new AbilityData ();
  Save = [.25, .20, .15, .10];

  constructor() { }

  calculateAffinity(abilitymastery: AbilityMastery[],
                    esarianGenetics: number = 0, connectionGenetics: number = 0) {
    try {
      this.catchErrors(abilitymastery, esarianGenetics, connectionGenetics);
    }
    catch(error) {
      throw error;
    }
    const SAStructure = this.getSAStructure(abilitymastery);
    const SAClasses = Object.keys(SAStructure);
    let CostStructure = [];
    SAClasses.forEach(saclass => {
      let discounts = this.getDiscount(SAStructure[saclass])
      let level = this.getClassLevel(discounts);
      CostStructure.push({SAClass: saclass,
                          Abilities: SAStructure[saclass],
                          Discounts: discounts,
                          Level: level});
    })
    CostStructure = this.getInteractionCost(CostStructure);
    CostStructure = this.adjustClass(CostStructure);
    CostStructure = this.geneticsModifier(CostStructure,
                          esarianGenetics, connectionGenetics);      
    return this.calculateCost(CostStructure);
  }

  catchErrors(abilitymastery: AbilityMastery[],
              esarianGenetics: number, connectionGenetics: number) {
    abilitymastery.forEach(type => {
      if(type.Ability in ['Integrate', 'Maintain', 'Imprint']){
        if(type.Ability !== 'Low') {
          throw new Error('Integrate, Maintain, and Imprint do not have levels above low.');
        }
      }
    })

    if(esarianGenetics > 1
      || esarianGenetics < 0
      || esarianGenetics === null
      || connectionGenetics > 1
      || connectionGenetics < 0
      || connectionGenetics === null) {
      throw new Error('Genetics values cannot be less than 0 or greater than 1.');
    }

    const abilities = abilitymastery.map(abimas => abimas.Ability);
    const uniqueAbilities = new Set(abilities);

    if(uniqueAbilities.size !== abilities.length) {
      throw new Error('You cannot have duplicate Source Abilities.');
    }
  }

   getSAStructure(abilitymastery: AbilityMastery[]) {
    abilitymastery.sort((a,b) =>
        a.Mastery > b.Mastery ? -1 :
        a.Mastery < b.Mastery ? 1 : 0);

    let structure = {};
    abilitymastery.forEach(ability => {
      let SAClass = this.SAData[ability.Ability].Class
      if(SAClass in structure) {
        structure[SAClass].push(ability);
      } else {
        structure[SAClass] = [ability];
      }
    });
    return(structure);
  }

  getDiscount(Abilities: any[]) {
    let Costs: number[][] = [];
    let Mastery: number[] = [];
    Abilities.forEach((ability, i) => {
      Costs.push([]);
      if(i === 0){
        Mastery.push(ability.Mastery+1)
        for(let j=0; j<Mastery[0]; j++) {
          Costs[i].push(1);
        }
      } else {
        let partials =  Array<number>(i);
        for(let j = 0; j<ability.Mastery+1; j++) {
          for(let k = 0; k<partials.length; k++) {
            partials[k] = (this.Save[j]+.025*(Mastery[k])) / (2**(k));
          }
          Costs[i].push(1 - partials.reduce((a, b) => a + b, 0));
          Mastery.push(ability.Mastery+1);
        }
      }
    })
    return Costs;
  }

  getClassLevel(Costs: any) {
    Costs = Costs.map(ability => ability.reduce((a,b) => a+b, 0));
    return Costs.reduce((a,b) => a+b, 0);
  }

  getInteractionCost(CostStructure: any[]) {
    CostStructure.forEach((saclass, i) =>{
      if(i === 0){
        saclass.BufferCost = 0;
      } else {
        let interactions = new Array(i);
        for(let j = 0; j< i; j++){
          interactions.push(this.Related[saclass.SAClass][CostStructure[j].SAClass]
              *CostStructure[j].Level);
        }
        saclass.BufferCost = interactions.reduce((a,b) => a*b, 1)/100;
      }
    });
    return CostStructure;
  }

  adjustClass(CostStructure: any[]){
    CostStructure.forEach(saclass =>
      saclass.Discounts = saclass.Discounts.map(cost =>
        cost = cost.map(c => c + saclass.BufferCost)));
    return CostStructure;
  }

  geneticsModifier(CostStructure: any[], eGenes: number, cGenes: number){
    CostStructure.forEach((saclass) => {
      if (saclass.SAClass === "Reconstruction") {
        saclass.Abilities.forEach((ability, j) => {
          if(ability.Ability == "Metamorph") {
            saclass.Discounts[j] = saclass.Discounts[j].map(c => c -= eGenes*.8);
          }
        });
      } else if(saclass.SAClass === "ConfigurationManipulation") {
        saclass.Abilities.forEach((ability, j) => {
          if(ability.Ability == "Connection") {
            saclass.Discounts[j] = saclass.Discounts[j].map(c => c -= cGenes*.25);
          }
        })
      }
    });
    return CostStructure;
  }

  calculateCost(CostStructure) {
    let Cost = 0;
    CostStructure.forEach(saclass => {
      saclass.Discounts.forEach((cost, i) => {
        cost.forEach((c, j) => {
          Cost += this.SAData[saclass.Abilities[i].Ability].Costs[j]*c
        })
      })
    });
    return  Math.round(Cost*100)/100;
  }
}
