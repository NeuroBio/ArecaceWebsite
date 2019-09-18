import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';


import { CRUD } from '../../../services/CRUD.service'
import { EditService } from '../../../services/edit.service';
import { FileHierarchy } from 'src/app/Classes/filehierarchy';

@Component({
  selector: 'app-storyform',
  templateUrl: './storyform.component.html',
  styleUrls: ['../../Form.css']
})

export class StoryFormComponent implements OnInit, OnDestroy {
  
  edit:boolean = false;
  storyForm = this.createForm();
  message:string = '';
  stream:Subscription;
  stream2: Subscription;
  stream3: Subscription;
  allowDelete: boolean;
  allowEditAll: boolean;

  editStory:any;
  action:string='Submit';
  init:boolean=true;
  fileHierarchy = new FileHierarchy;

  constructor(private uploaderserv: CRUD,
              private editserv: EditService,
              private fb:FormBuilder) { }

  ngOnInit() {
    this.init = false
    this.stream = this.editserv.itemToEdit.subscribe(item => {
      this.editStory=item;
      this.assignEdit();
      this.init = false
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
    if(this.editStory){
      this.storyForm = this.editserv.quickAssign(this.storyForm, this.editStory);
      this.action = 'Accept Edits';
      this.uploaderserv.getText(this.editStory.StoryLink).subscribe( text =>
        this.storyForm.controls.Story.setValue(text) )
    }else if(!this.init){
      this.onReset()
    }
  }
  onSubmit(){
    this.message = "Processing Data..."
    let newStory = this.storyForm.value;
    delete newStory.Story;
    const text:string = this.storyForm.controls.Story.value;
    newStory.WordCount = text.trim().split(/\s+/).length
    newStory.ID = `${newStory.Title.replace(/\s/g, "")}`
    const seriesData = {ID:`${newStory.Series.replace(/\s/g, "")}`,
                        Name: newStory.Series}
    var newText = new Blob([text], {type: 'text/plain'});

    if(!this.editStory){
      this.message = "Hold on, uploading!";
      return this.uploaderserv.uploadWriting(newStory, `${newStory.Type}s`, 
                                              newText, `${newStory.Type}s/${newStory.ID}`, seriesData)
      .then(()=>{
        this.onReset();
        this.message = "Successful upload!";
      })
    }else{
      this.message = "Hold on, editing!";
      const oldSeries = this.editStory.Series.split(' ').join('')
      return this.uploaderserv.editWriting(newStory, `${newStory.Type}s`, newText, `${newStory.Type}s/${newStory.ID}`,
                                            seriesData, this.editStory, `${newStory.Type}s/${oldSeries}/${oldSeries}`)
      .then(() => {
        this.editserv.itemToEdit.next(undefined);
        this.message = "Edit successful!";
      });      
    }
  }

  onDelete(){                           
    this.message = 'Hold on, deleting!';
    const series = this.editStory.Series.split(' ').join('');
    this.uploaderserv.deleteItem([this.editStory.StoryLink], `${this.editStory.Type}s/${series}/${series}`, this.editStory.key)
    .then(() => {
      this.editserv.itemToEdit.next(undefined);
      this.message = 'Successful Delete!';
    })
  }

  onReset(){
    this.storyForm = this.createForm();
    this.action='Submit';
  }

  createForm(){
    return this.fb.group({
      Type: 'Narrative',
      Series: '',
      Title: '',
      Section: 0,
      Synopsis: '',
      Story: ''
    })
  }

  updateAll(){
    this.fileHierarchy.story.Path.forEach(type =>
      this.editserv.getEditableCollection(type)
      .subscribe(collect =>{
        collect.forEach(member => {
            this.editStory = member;
            this.assignEdit();
            this.onSubmit();  
        })
      })
    )
  }
}
