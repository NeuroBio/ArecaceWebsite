import { Component, OnInit, OnDestroy,
          ViewChild, ElementRef }         from '@angular/core';
import { FormBuilder, FormGroup }         from '@angular/forms';
import { Subscription }                   from 'rxjs';

import { CRUDcontrollerService }          from '../../../services/CRUDcontroller.service';
import { ChapterMetaData }                from 'src/app/Classes/chaptermetadata'

@Component({
  selector: 'app-chapterform',
  templateUrl: './chapterform.component.html',
  styleUrls: ['../../Form.css']
})
export class ChapterFormComponent implements OnInit, OnDestroy {

  Form: FormGroup;
  @ViewChild('form') formHtml:ElementRef;
  
  stream1: Subscription;
  stream2: Subscription;

  pageFiles = new Array(10);
  dummy = new Array(10);
  Arcs = [1,2,3,4, "WRC", "LW", 7, "Dae"];
  
  constructor(private fb:FormBuilder,
              private controller:CRUDcontrollerService) { }
  
  ngOnInit() {
    this.stream1 = this.controller.itemToEdit
      .subscribe(item => this.assignFormData(item));
    this.stream2 = this.controller.triggerProcess
      .subscribe(() => this.processForm());
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
  }

  createForm() {
    return this.fb.group({
      Name: '',
      ID: '',
      Index:'',
      Arc: 1,
      Message: '',
      Links: ''
    });
  }

  assignFormData(editFormData: any) {
    this.onReset();
    if(editFormData) {
      this.Form = this.controller.quickAssign(this.Form, editFormData);
      this.pageFiles = Array.apply(null, Array(editFormData.Links.length))
        .map(function () {});
      this.dummy = new Array(this.pageFiles.length);
    }
  }    
  
  processForm() {
    const Final: ChapterMetaData = Object.assign({}, this.Form.value);
    Final.NumPages = this.pageFiles.length;
    const pagePaths: string[] = this.getPagePaths(this.pageFiles, Final);
    this.controller.activeFormData.next([Final,
                                        pagePaths,
                                        this.pageFiles,
                                        Final.Links,
                                        undefined,
                                        undefined,
                                        undefined]);
        // return this.uploadserv.uploadItem(newChap,`Arc${newChap.Arc}Data`);
  }

  onReset() {
      this.formHtml.nativeElement.reset();
      this.Form = this.createForm();
      this.pageFiles = new Array(10);
      this.dummy = new Array(10);
  }

  addPage(add: boolean) {
    if(add){
      this.pageFiles.push('');
      this.dummy.push('');
    }else{
      this.pageFiles.pop();
      this.dummy.pop();
    }
  }

  updatePage(ind: number, event: any) {
    this.pageFiles[ind] = event;
  }

  getPagePaths(pages: any[], newChap: any) {
    let pagePaths: string[] = [];
    for(let i = 0; i< pages.length; i++){
      pagePaths.push(`ComicPages/Arc${newChap.Arc}/${newChap.ID}-${i}`);
    }
    return(pagePaths);
  }

}
