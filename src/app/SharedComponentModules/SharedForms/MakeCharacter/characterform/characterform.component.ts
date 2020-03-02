import { Component, ViewChild, OnInit,
         OnDestroy, ElementRef }                    from '@angular/core';
import { FormBuilder, FormArray,
         FormGroup, Validators}                     from '@angular/forms';

import { Subscription }                             from 'rxjs';

import { CharacterMetaData }                        from 'src/app/Classes/ContentClasses';
import { SourceAbilities, Relations }               from '../formclasses';
import { UploadCharacterDrops }                     from '../uploadcharacterdrops';
import { QuickAssign }                              from 'src/app/GlobalServices/commonfunctions.service';
import { FetchService }                             from 'src/app/GlobalServices/fetch.service';
import { ImageResizerService } from 'src/app/administration/services/image-resizer.service';



@Component({
  selector: 'app-characterform',
  templateUrl: './characterform.component.html',
  styleUrls: ['../../../../administration/Forms/Form.css', './characterform.component.css']
})

export class CharacterFormComponent implements OnInit, OnDestroy {

//form generator vals
  DropDowns = new UploadCharacterDrops;
  Form: FormGroup;

  @ViewChild('bioPicThumb', { static: true }) biopicThumbUploader: ElementRef;
  @ViewChild('bioPicFull', { static: true }) biopicFullUploader: ElementRef;
  biopicThumbFile: any;
  biopicFullFile: any;
  fullFiles: any[];
  thumbFiles: any[];

  stream1: Subscription;
  stream2: Subscription;
  stream3: Subscription;
  
  SourceAbilitiesArray = this.populateSAbilities();
  RelationsArray: FormArray;
  ReferencesArray: FormArray;

  toneColor1: string;
  toneColor2: string;
  activeRegion: string[];
  daysArray: number[];
  showUnique: boolean;
  imageFolderPath: string;

  constructor(private fb: FormBuilder,
              private fetcher: FetchService,
              private qa: QuickAssign,
              private resizeserv: ImageResizerService) {}

  ngOnInit() {
    this.stream1 = this.fetcher.itemToEdit
      .subscribe(item => this.assignFormData(item));
    this.stream2 = this.fetcher.processData
      .subscribe(() => this.processForm());
    this.stream3 = this.Form.valueChanges.subscribe(valid =>
      this.fetcher.assignvalidity(valid));
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.stream3.unsubscribe();
  }

  createForm() {
    return this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
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

  assignFormData(editFormData: any) {
    this.onReset();
    if(editFormData) {
      this.Form = this.qa.assign(this.Form, editFormData);
      
      this.Form.controls.SourceAbilities.setValue(
        <SourceAbilities[]>JSON.parse(editFormData.SourceAbilities));
      
      this.Form.controls.Unique.setValue(
        <SourceAbilities[]>JSON.parse(editFormData.Unique));
      
      const relatives = <Relations[]>JSON.parse(editFormData.Relations);
      relatives.forEach(relative =>
        this.addRelative(true, relative.RelationName, relative.Relationship));
      if(editFormData.ReferenceIDs){
        editFormData.ReferenceIDs.forEach(Ref => this.addRef(true, Ref.Ref));
      }

      this.showUnique = this.Form.controls.Unique.value.Known;
      this.setdisplayValues();
    }
  }
  
  processForm() {
    // Invalid Form
    // Incomplete Form
    if((this.biopicFullFile === undefined
      || this.biopicThumbFile === undefined)
      && this.Form.controls.Links.value === '') {
       this.fetcher.assignActiveFormData(["abort",
       "Bio files require a bio image."]);
       return ;
    }

    const Final: CharacterMetaData = Object.assign({}, this.Form.value); 
    Final.SourceAbilitiesFormatted = this.FormatSA(Final);
    Final.RelationsFormatted = this.FormatRelat(Final);
    Final.SourceAbilities = JSON.stringify(Final.SourceAbilities);
    Final.Relations = JSON.stringify(Final.Relations);
    Final.Unique = JSON.stringify(Final.Unique);
    Final.ID = Final.FirstName.split(' ').join('');
    Final.References = this.createReference(Final.ReferenceIDs, Final.FirstName);

    const imagePaths = [`hell/${Final.FirstName}-Thumb`,
                        `hell/${Final.FirstName}-Full`
                        ].concat(this.refNames(this.fullFiles, Final.FirstName));
    
    return this.resizeserv.resizeImage(this.biopicFullFile, 450, 450)
    .then(resizedBlob => {
      console.log('form!');
      const imageEvents = [{target: {files: [resizedBlob]}}, this.biopicFullFile]
      .concat(this.combineLinks(this.fullFiles, this.thumbFiles));
      return this.fetcher.assignActiveFormData([Final,
        imagePaths,
        imageEvents,
        Final.Links,
        undefined,
        undefined,
        undefined]);
    });
  }

  onReset() {
    this.RelationsArray = this.fb.array([]);
    this.ReferencesArray = this.fb.array([]);
    this.Form = this.createForm();
    this.daysArray = new Array(30);
    this.setdisplayValues();
    this.biopicFullUploader.nativeElement.value = '';
    this.biopicFullFile = undefined;
    this.biopicThumbUploader.nativeElement.value = '';
    this.biopicThumbFile = undefined;
    this.fullFiles = [];
    this.thumbFiles = [];
    this.showUnique = false;
  }

  uploadBioPicFull(event: any) {
    this.biopicFullFile = event;
  }

  uploadBioPicThumb(event: any) {
    this.biopicThumbFile = event;
  }

  uploadFull(event: any, index: number) {
    this.fullFiles[index] = event;
  }

  uploadThumb(event: any, index: number) {
    this.thumbFiles[index] = event;
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
      (<FormArray>this.Form.controls.Relations)
      .push(this.fb.group({RelationName: name, Relationship:ship}));
    }else{
      (<FormArray>this.Form.controls.Relations)
      .removeAt(this.Form.controls.Relations.value.length-1);
    }
  }

  addRef(add: boolean, ref: string = '') {
    if(add){
      (<FormArray>this.Form.controls.ReferenceIDs)
        .push(this.fb.group({ Ref: ref }));
      this.fullFiles.push('');
      this.thumbFiles.push('');
    }else{
      (<FormArray>this.Form.controls.ReferenceIDs)
        .removeAt(this.Form.controls.ReferenceIDs.value.length-1);
      this.fullFiles.pop();
      this.thumbFiles.pop();
    }
  }

  FormatSA(data:any) {
    let abilities:string[] = [];
    data.SourceAbilities.forEach(ability => {
      if(ability.Known){
        abilities.push(ability.Ability);
      }
    });

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
    });

    let final = relations.join(', ');
    if(final === ""){
      final = "None";
    }
    return final;
  }

  combineLinks(full: string[], thumb: string[]) {
    if(thumb.length > 0){
      return thumb.map((thumb,i) => [thumb, full[i]])
        .reduce(function(a,b) {
          return a.concat(b); });
    }else{
      return [];
    }
  }

  refNames(imageEvents: any[], name:string) {
    let imgNames: string[] = [];
    for(let event in imageEvents) {
      imgNames.push(`CharacterBios/${name}-Ref${event}-thumb`);
      imgNames.push(`CharacterBios/${name}-Ref${event}-full`);
    }
    return imgNames;
  }

  createReference(ids: any[], name: string) {
    if(name.endsWith('s')) {
      name = name.concat("'");
    } else {
      name = name.concat("'s");
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
      this.toneColor1 = this.DropDowns.Ethnicity
        .filter(x => select === x.id)[0].hex;
    } else {
      this.toneColor2 = this.DropDowns.Ethnicity
        .filter(x => select === x.id)[0].hex;
    }
  }

  allowUnique(check: boolean) {
    this.showUnique = check;
  }

  updateTerritory(nation: string) {
    this.activeRegion = this.DropDowns.countries
      .filter(x => nation === x.id)[0].terr;
    this.Form.patchValue({Territory: this.activeRegion[0]});
  }

  updateAge(chosenQT: string) {
    const index = this.DropDowns.Quartrits.findIndex(QT => chosenQT === QT);
    this.daysArray = new Array(this.DropDowns.Months[index]);
    this.Form.patchValue({ Zodiac: this.DropDowns.Zodiacs[index], Day: 1 })
  }

  updateCM() {
    const inches: number = this.Form.controls.Ft.value*12
                          + this.Form.controls.Inch.value;
    this.Form.patchValue({ Cm:(inches*2.54).toFixed(2) });
  }

  updateFtIn() {
    const inches = this.Form.controls.Cm.value*.393701;
    this.Form.patchValue({
      Inch: (inches%12).toFixed(2),
      Ft: Math.floor(inches/12)
    });
  }

  getDropData(group:string, id: string, formvalue: string, desired: string) {
    return this.DropDowns[group].find(member =>
      member[id] === this.Form.controls[formvalue].value)[desired];
  }

  setdisplayValues() {
    this.toneColor1 = this.getDropData('Ethnicity', 'id', 'Ethnicity1', 'hex');
    this.toneColor2 = this.getDropData('Ethnicity', 'id', 'Ethnicity2', 'hex');
    this.activeRegion = this.getDropData('countries', 'id', 'Country', 'terr');
  }
  
}