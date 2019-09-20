import { Component, ViewChild, OnInit,
         OnDestroy, ElementRef }        from '@angular/core';
import { FormBuilder, FormArray}        from '@angular/forms';
import { Subscription }                 from 'rxjs';

import { CharacterMetaData }            from 'src/app/Classes/charactermetadata';
import { CRUDcontrollerService }        from '../../../services/CRUDcontroller.service';
import { UploadCharacterDrops }         from '../uploadcharacterdrops';
import { SourceAbilities, Relations }   from '../formclasses';


@Component({
  selector: 'app-characterform',
  templateUrl: './characterform.component.html',
  styleUrls: ['../../Form.css']
})

export class CharacterFormComponent implements OnInit, OnDestroy{

//form generator vals
  DropDowns = new UploadCharacterDrops;
  characterForm = this.createCharacterForm();
  @ViewChild('bioPic') Image: ElementRef;
  imageLink: any;
  fullLinks = [];
  thumbLinks = [];

  stream1: Subscription;
  stream2: Subscription;
  editFormData: any;
  init = true;
  
  SourceAbilitiesArray = this.populateSAbilities();
  RelationsArray = this.fb.array([]);
  ReferencesArray = this.fb.array([]);
  proxyarray: number[] = [];

  toneColor1: string;
  toneColor2: string;
  activeRegion: string[];
  daysArray = new Array(30);
  showUnique = false; 

  constructor(private fb: FormBuilder,
              private controller: CRUDcontrollerService) {}

  ngOnInit() {
    this.stream1 = this.controller.itemToEdit.subscribe(item => {
      this.editFormData = item;
      this.assignFormData();
      this.init = false;
    });
    this.stream2 = this.controller.triggerProcess.subscribe(() => this.processForm());
  }

  ngOnDestroy() {
    this.stream1.unsubscribe()
    this.stream2.unsubscribe()
  }

  createCharacterForm() {
    return this.fb.group({
      FirstName: '',
      LastName: '',
      SMClass: 'Source Magician',
      Occupation: '',
      Country: 'Escholzian',
      Territory: 'The Chloris Plains',
      City: '',
      Ethnicity1: 'Hns',
      Ethnicity2: 'Hns',
      Age: 0,
      Year: 283,
      Era: 'DE',
      Qt: 'Qt1-1',
      Day: 1,
      Zodiac: 'The Engineer',
      Ft: 0,
      Inch: 0,
      Cm: 0,
      DistinguishingMarks: '',
      Personality: '',
      Philosophy: '',
      MotivationsGoals: '',
      Strengths: '',
      Weaknesses: '',
      SourceAbilities: this.SourceAbilitiesArray,
      Unique: this.fb.group({
        Ability:'',
        Known:false
      }),
      Relations: this.RelationsArray,
      ReferenceIDs: this.ReferencesArray,
      BriefBackground: '',
      FullBackground: '',
      Links: ''
    });
  }

  assignFormData() {
    if(this.editFormData){
      this.onReset();
      this.characterForm = this.controller.quickAssign(this.characterForm, this.editFormData);
      
      this.characterForm.controls.SourceAbilities.setValue(
        <SourceAbilities[]>JSON.parse(this.editFormData.SourceAbilities));
      
      this.characterForm.controls.Unique.setValue(
        <SourceAbilities[]>JSON.parse(this.editFormData.Unique));
      
        const relatives = <Relations[]>JSON.parse(this.editFormData.Relations);
      relatives.forEach(relative => this.addRelative(true, relative.RelationName, relative.Relationship));
      if(this.editFormData.ReferenceIDs){
        this.editFormData.ReferenceIDs.forEach(Ref => this.addRef(true, Ref.Ref));
      }

      this.showUnique = this.characterForm.controls.Unique.value.Known;
      this.setdisplayValues();
    }else{
      this.onReset();
    }
  }
  
  processForm() {
    //Invalid Form
    if(false){

    }

    const Final:CharacterMetaData = this.characterForm.value; 
    Final.SourceAbilitiesFormatted = this.FormatSA(Final);
    Final.RelationsFormatted = this.FormatRelat(Final);
    Final.SourceAbilities = JSON.stringify(Final.SourceAbilities);
    Final.Relations = JSON.stringify(Final.Relations);
    Final.Unique = JSON.stringify(Final.Unique);
    Final.ID = Final.FirstName.split(' ').join('');
    Final.References = this.createReference(Final.ReferenceIDs, Final.FirstName);

    const imagePaths = [`CharacterBios/${Final.FirstName}`]
                        .concat(this.refNames(this.fullLinks, Final.FirstName));
    const imageEvents = [this.imageLink].concat(this.combineLinks(this.fullLinks, this.thumbLinks));
    
    this.controller.activeFormData.next([Final,
                                      imagePaths,
                                      imageEvents,
                                      Final.Links,
                                      undefined,
                                      undefined,
                                      undefined]);
  }

  onReset() {
    this.RelationsArray = this.fb.array([]);
    this.ReferencesArray = this.fb.array([]);
    this.characterForm = this.createCharacterForm();
    this.daysArray = new Array(30);
    this.setdisplayValues();
    this.Image.nativeElement.value = '';
    this.imageLink = undefined;
    this.fullLinks = [];
    this.thumbLinks = [];
    this.showUnique = false;
  }



  //Processing functions
  populateSAbilities() {
    let abilityArray:FormArray = new FormArray([]);
    for(let ability of this.DropDowns.SAbilities){
    abilityArray.push( this.fb.group({Ability: ability, Known: false}) );
    }
    return abilityArray;
  }

  addRelative(add: boolean, name: string = '', ship: string = '') {
    if(add){
      (<FormArray>this.characterForm.controls.Relations)
      .push(this.fb.group({RelationName: name, Relationship:ship}));
    }else{
      (<FormArray>this.characterForm.controls.Relations)
      .removeAt(this.characterForm.controls.Relations.value.length-1);
    }
  }

  addRef(add: boolean, ref: string = '') {
    if(add){
      (<FormArray>this.characterForm.controls.ReferenceIDs)
      .push(this.fb.group({ Ref: ref }));
      this.fullLinks.push('');
      this.thumbLinks.push('');
    }else{
      (<FormArray>this.characterForm.controls.ReferenceIDs)
      .removeAt(this.characterForm.controls.ReferenceIDs.value.length-1);
      this.fullLinks.pop();
      this.thumbLinks.pop();
    }
  }

  FormatSA(data:any) {
    let abilities:string[] = [];
    data.SourceAbilities.forEach(ability =>{
      if(ability.Known){
        abilities.push(ability.Ability);
      }
    })
    if(data.Unique.Known){
      abilities.push(data.Unique.Ability);
    }

    let final = abilities.join(", ");
    if(final === ""){
      final = "None";
    }
    return final;
  }

  FormatRelat(data:any) {
    let relations:string[] = [];
    data.Relations.forEach(relation => {
      relations.push(`${relation.RelationName}-${relation.Relationship}`)
    })
    let final = relations.join(', ');
    if(final === ""){
      final = "None"
    }
    return final;
  }

  combineLinks(full: string[], thumb: string[]) {
    if(thumb.length > 0){
      return thumb.map((thumb,i) => [thumb, full[i]])
        .reduce(function(a,b) { return a.concat(b); });
    }else{
      return [];
    }
  }

  refNames(imageEvents: any[], name:string) {
    let imgNames: string[] = [];
    for(let event in imageEvents){
      imgNames.push(`CharacterBios/${name}-Ref${event}-thumb`);
      imgNames.push(`CharacterBios/${name}-Ref${event}-full`);
    }
    return imgNames;
  }

  createReference(ids: any[], name: string) {
    if(name.endsWith('s')){
      name = name.concat("'") 
    }else{
      name = name.concat("'s")
    }

    let references: any[] = [];
    for(let index in ids){
      references.push({
        ID: ids[index].Ref.split(' ').join(''),
        Name: `${name} ${ids[index].Ref}`,
        AltText: `${name} ${ids[index].Ref}`,
      });
    }
    return(references);
  }



  //display functions
  updateColor(select: string, which: number) {
    if(which === 1) {
      this.toneColor1 = this.DropDowns.Ethnicity.filter(x => select === x.id)[0].hex;
    } else {
      this.toneColor2 = this.DropDowns.Ethnicity.filter(x => select === x.id)[0].hex;
    }
  }

  allowUnique(check: boolean) {
    this.showUnique = check;
  }

  uploadBioPic(event: any) {
    this.imageLink = event;
  }

  uploadFull(event: any, index: number) {
    this.fullLinks[index] = event;
  }

  uploadThumb(event: any, index: number) {
    this.thumbLinks[index] = event;
  }

  updateTerritory(nation: string) {
    this.activeRegion = this.DropDowns.countries.filter(x => nation === x.id)[0].terr;
    this.characterForm.patchValue({Territory: this.activeRegion[0]})
  }

  updateAge(qt: string){
    const qtData = this.DropDowns.Quartrits.filter(x => qt === x.qt)[0];
    this.daysArray = new Array(qtData.days);
    this.characterForm.patchValue({ Zodiac: qtData.zodiac, Day: 1 })
  }

  updateCM() {
    const inches: number = this.characterForm.controls.Ft.value*12
                          + this.characterForm.controls.Inch.value
    this.characterForm.patchValue({ Cm:(inches*2.54).toFixed(2) })
  }

  updateFtIn() {
    const inches = this.characterForm.controls.Cm.value*.393701;
    this.characterForm.patchValue({
      Inch: (inches%12).toFixed(2),
      Ft: Math.floor(inches/12)
    })
  }

  getDropData(group:string, id: string, formvalue: string, desired: string) {
    return this.DropDowns[group].find(member =>
      member[id] === this.characterForm.controls[formvalue].value
      )[desired]
  }

  setdisplayValues() {
    this.toneColor1 = this.getDropData('Ethnicity', 'id', 'Ethnicity1', 'hex')
    this.toneColor2 = this.getDropData('Ethnicity', 'id', 'Ethnicity2', 'hex')
    this.activeRegion = this.getDropData('countries', 'id', 'Country', 'terr')
  }
  
}