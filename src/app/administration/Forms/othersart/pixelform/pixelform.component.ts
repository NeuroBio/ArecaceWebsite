import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CRUDcontrollerService } from 'src/app/administration/services/CRUDcontroller.service';
import { OthersArt } from 'src/app/Classes/othersart';

@Component({
  selector: 'app-pixelform',
  templateUrl: './pixelform.component.html',
  styleUrls: ['../../Form.css']
})
export class PixelformComponent implements OnInit, OnDestroy {

  Form: FormGroup;
  @ViewChild('File') fileUploader: ElementRef;
  file: any;

  stream1: Subscription;
  stream2: Subscription;

  constructor(private fb: FormBuilder,
              private controller: CRUDcontrollerService) { }

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
        Links: '',
        ID: '',
        Date: '',
        Artist: '',
        ArtistLink: '',
        Allowed: 'false'
    });
  }
  
  assignFormData(editFormData: any) {
    this.onReset();
    if(editFormData) {
      this.Form = this.controller.quickAssign(this.Form, editFormData);
      this.Form.patchValue({Allowed: editFormData.Allowed === true ? 'true' : 'false'});
    }
  }

  processForm() {
    //Incomplete Form
    if((this.file === undefined)
      && this.Form.controls.Links.value === '') {
      this.controller.activeFormData.next(["abort",
        "Pixel files require images."]);
      return ;
    }
    
    const Final: OthersArt = Object.assign({}, this.Form.value);
    Final.ID = `${this.Form.controls.Name.value.split(' ').join('')}-by-${this.Form.controls.Artist.value.split(' ').join('')}`
    Final.Allowed = this.Form.value.Allowed === "true";

    this.controller.activeFormData.next([Final,
                                        [`OthersArt/${Final.ID}-pixel`],
                                        [this.file],
                                        Final.Links,
                                        undefined,
                                        undefined,
                                        undefined]);
  }

  onReset() {
    this.Form = this.createForm();
    this.file = undefined;
    this.fileUploader.nativeElement.value = '';
  }
  
  getFile(event:any) {
    this.file = event;
  }

}
