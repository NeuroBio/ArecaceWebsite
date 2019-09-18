import { Component, ViewChild, OnInit, OnDestroy, ElementRef }                    from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray, FormControl}        from '@angular/forms';

import { CharacterMetaData }                  from 'src/app/Classes/charactermetadata';
import { UploadCharacterDrops }         from '../uploadcharacterdrops';
import { CRUD }               from '../../../services/CRUD.service';
import { Subscription } from 'rxjs';
import { CRUDcontrollerService } from '../../../services/CRUDcontroller.service';
import { SourceAbilities, Relations } from '../formclasses';
import { FileHierarchy } from 'src/app/Classes/filehierarchy';

@Component({
  selector: 'app-characterform',
  templateUrl: './characterform.component.html',
  styleUrls: ['../../Form.css']
})

export class CharacterFormComponent implements OnInit, OnDestroy{

//form generator vals
  DropDowns = new UploadCharacterDrops;
  characterForm = this.createCharacterForm();
  toneColor1: string;
  toneColor2: string;
  activeRegion: string[];
  daysArray = new Array(30);
  showUnique: boolean=false;
  message: string;
  @ViewChild('bioPic') Image: ElementRef;
  imageLink: any;
  proxyarray: number[] = [];
  Results: CharacterMetaData;
  stream: Subscription;
  stream2: Subscription;
  stream3: Subscription;
  allowDelete: boolean;
  allowEditAll: boolean;

  editChara: any;
  action: string = 'Submit';
  fileHierarchy = new FileHierarchy;
  fullLinks: any[] = [];
  thumbLinks: any[] = [];
  SourceAbilitiesArray: FormArray = this.populateSAbilities();
  RelationsArray = this.fb.array([]);
  ReferencesArray = this.fb.array([]);

  constructor(private fb: FormBuilder,
              private uploadserv: CRUD,
              private editserv: CRUDcontrollerService) {}

  ngOnInit() {
    this.stream = this.editserv.itemToEdit.subscribe(item => {
      this.editChara = item;
      this.assignEdit();
    });
    this.stream2 = this.editserv.allowDelete.subscribe(bool => this.allowDelete = bool);
    this.stream3 = this.editserv.allowEditAll.subscribe(bool => this.allowEditAll = bool);
    }

    ngOnDestroy(){
      this.stream.unsubscribe()
      this.stream2.unsubscribe()
      this.stream3.unsubscribe()
    }

  assignEdit(){
    if(this.editChara){
      this.resetFileUpload();

      //get edit data into form
      this.characterForm = this.createCharacterForm();
      this.characterForm = this.editserv.quickAssign(this.characterForm, this.editChara);
      this.characterForm.controls.SourceAbilities.setValue(<SourceAbilities[]>JSON.parse(this.editChara.SourceAbilities));
      this.characterForm.controls.Unique.setValue(<SourceAbilities[]>JSON.parse(this.editChara.Unique));
      const relatives = <Relations[]>JSON.parse(this.editChara.Relations);
      relatives.forEach(relative => this.addRelative(true, relative.RelationName, relative.Relationship));
      if(this.editChara.ReferenceIDs){
        this.editChara.ReferenceIDs.forEach(Ref => this.addRef(true, Ref.Ref));
      }

      //set up form vals
      this.showUnique = this.characterForm.controls.Unique.value.Known;
      this.setdisplayValues();
      this.action = 'Accept Edits';
    }else{
      this.onReset()
    }
  }
  
  //Enthinicty dropdown colors
  updateColor(select: string, which: number){
    if(which === 1){
      this.toneColor1 = this.DropDowns.Ethnicity.filter(x => select === x.id)[0].hex;
    }else{
      this.toneColor2 = this.DropDowns.Ethnicity.filter(x => select === x.id)[0].hex;
    }
    
  }

 
  allowUnique(check: boolean){
    if(check){
      this.showUnique = true;
    }else{
      this.showUnique = false;
    }
  }

  //Get bio image
  uploadBioPic(event: any){
    this.imageLink = event;
  }

  uploadFull(event: any, index: number){
    this.fullLinks[index] = event;
  }

  uploadThumb(event: any, index: number){
    this.thumbLinks[index] = event;
  }

  //get right territories given nation choice
  updateTerritory(nation: string){
    this.activeRegion = this.DropDowns.countries.filter(x => nation === x.id)[0].terr;
    this.characterForm.patchValue({Territory:this.activeRegion[0]})
  }

  //update the zodiac and days when Qt changed
  updateAge(qt: string){
    const qtData = this.DropDowns.Quartrits.filter(x => qt === x.qt)[0];
    this.daysArray = new Array(qtData.days);
    this.characterForm.patchValue({ Zodiac: qtData.zodiac, Day: 1 })
  }

  //make sure all height values mesh
  updateCM(){
    const inches: number = this.characterForm.controls.Ft.value*12
                          + this.characterForm.controls.Inch.value
    this.characterForm.patchValue({Cm:(inches*2.54).toFixed(2)})
  }

  updateFtIn(){
    const inches = this.characterForm.controls.Cm.value*.393701;
    this.characterForm.patchValue({
      Inch: (inches%12).toFixed(2),
      Ft: Math.floor(inches/12)
    })
  }

  //deal with relatives data
  addRelative(add: boolean, name: string = '', ship: string = ''){
    if(add){
      (<FormArray>this.characterForm.controls.Relations)
      .push(this.fb.group({RelationName: name, Relationship:ship}));
    }else{
      (<FormArray>this.characterForm.controls.Relations)
      .removeAt(this.characterForm.controls.Relations.value.length-1);
    }
  }

  addRef(add: boolean, ref: string = ''){
    if(add){
      (<FormArray>this.characterForm.controls.ReferenceIDs)
      .push(this.fb.group({Ref: ref}));
      this.fullLinks.push('');
      this.thumbLinks.push('');
    }else{
      (<FormArray>this.characterForm.controls.ReferenceIDs)
      .removeAt(this.characterForm.controls.ReferenceIDs.value.length-1);
      this.fullLinks.pop();
      this.thumbLinks.pop();
    }
  }

  FormatSA(data:any){
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

  FormatRelat(data:any){
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

  combineLinks(full: string[], thumb: string[]){
    if(full.length > 0){
      return full.map((thumb,i) => [thumb, full[i]]).reduce(function(a,b) { return a.concat(b); });
    }else{
      return [];
    }
  }
  refNames(imageEvents: any[], name:string){
    let imgNames: string[] = [];
    for(let event in imageEvents){
      imgNames.push(`CharacterBios/${name}-Ref${event}-thumb`);
      imgNames.push(`CharacterBios/${name}-Ref${event}-full`);
    }
    return imgNames;
  }

  createReference(ids: any[], name: string, links: string[]){
    links.splice(0,1);
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
        Links: [links[+index*2], links[+index*2+1]]
      });
    }
    return(references);
  }
 //major form controls
  onSubmit(){
    this.message = "Processing Data"
    let results = Object.assign({}, this.characterForm.value);
    
    results.SourceAbilitiesFormatted = this.FormatSA(results);
    results.RelationsFormatted = this.FormatRelat(results);
    results.SourceAbilities = JSON.stringify(results.SourceAbilities);
    results.Relations = JSON.stringify(results.Relations);
    results.Unique = JSON.stringify(results.Unique);
    results.ID = results.FirstName.split(' ').join('');
    const imageEvents = [this.imageLink].concat(this.combineLinks(this.fullLinks, this.thumbLinks));
    const imagePaths = [`CharacterBios/${results.FirstName}`]
                        .concat(this.refNames(this.fullLinks, results.FirstName));
    const newChara:CharacterMetaData = results;
    if(!this.editChara){
      this.message = "Hold on, uploading!";
      return this.uploadserv.uploadImages(imagePaths, imageEvents)
      .then(links => {
        newChara.Links = Object.assign([], links);
        newChara.References = this.createReference(newChara.ReferenceIDs, newChara.FirstName, links);
        return this.uploadserv.uploadItem(newChara,'CharacterBios');
      }).then(() => {
          this.onReset();
          this.message="Successful upload!"
      });
    }else{
      this.message = "Hold on, editing!";
      return this.uploadserv.editImages(imagePaths, imageEvents, this.editChara.Links)
      .then(links => {
        newChara.Links = Object.assign([], links);
        newChara.References = this.createReference(newChara.ReferenceIDs, newChara.FirstName, links);
        console.log(newChara.References)
        return this.uploadserv.editItem(newChara,'CharacterBios', this.editChara.key);
      }).then(() => {
          this.editserv.itemToEdit.next(undefined);
          this.message="Successful edit!";
      });
    }
  }

  onDelete(){
    this.message = 'Hold on, deleting!'
    this.uploadserv.deleteItem(this.editChara.Links, 'CharacterBios', this.editChara.key)
    .then(() => {
      this.editserv.itemToEdit.next(undefined);
      this.message = 'Successful Delete!';
    })
  }

  getDropData(group:string, id:string, formvalue:string, desired:string){
    return this.DropDowns[group].find(member => member[id]===this.characterForm.controls[formvalue].value)[desired]
  }

  setdisplayValues(){
    this.toneColor1 = this.getDropData('Ethnicity', 'id', 'Ethnicity1', 'hex')
    this.toneColor2 = this.getDropData('Ethnicity', 'id', 'Ethnicity2', 'hex')
    this.activeRegion = this.getDropData('countries', 'id', 'Country','terr')
  }
  
  resetFileUpload(){
    this.Image.nativeElement.value = '';
    this.imageLink = undefined;
    this.fullLinks = [];
    this.thumbLinks = [];
  }

  onReset(){
    this.RelationsArray = this.fb.array([]);
    this.ReferencesArray = this.fb.array([]);
    this.characterForm = this.createCharacterForm();
    this.daysArray= new Array(30);
    this.setdisplayValues()
    this.resetFileUpload()
    this.showUnique = false;
    this.action = 'Submit';
  }

  populateSAbilities(){
    let abilityArray:FormArray = new FormArray([]);
    for(let ability of this.DropDowns.SAbilities){
    abilityArray.push( this.fb.group({Ability: ability, Known: false}) );
    }
    return abilityArray;
  }

  updateAll(){
    this.editserv.getEditableCollection(this.fileHierarchy.characters.Path[0])
                  .subscribe(collect =>{
                    collect.forEach(member => {
                        this.editChara = member;
                        this.assignEdit();
                        this.onSubmit();  
      })
    })
  }
  
  createCharacterForm(){
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
}