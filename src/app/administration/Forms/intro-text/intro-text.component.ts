import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder }                  from '@angular/forms';

import { Subscription, Subject }        from 'rxjs';
import { takeUntil }                    from 'rxjs/operators';

import { CRUDcontrollerService }        from '../../services/CRUDcontroller.service';
import { Intro }                        from 'src/app/Classes/WebsiteText';

@Component({
  selector: 'app-intro-text',
  templateUrl: './intro-text.component.html',
  styleUrls: ['../Form.css']
})
export class IntroTextComponent implements OnInit, OnDestroy {

  Form = this.createForm();
  stream1 = new Subscription();
  stop$ = new Subject<boolean>();
  IntrosArray = this.fb.array([]);
  ImageEvents: any[] = [];
  oldLinks: string[] = [];

  constructor(private fb: FormBuilder,
              private controller: CRUDcontrollerService) { }

  ngOnInit() {
    this.controller.itemToEdit
    .pipe(takeUntil(this.stop$))
    .subscribe(item => {
      this.assignFormData(item);
    });

    this.stream1 = this.controller.triggerProcess.subscribe(() => this.processForm());
  }

  ngOnDestroy() {
    this.stop$.next(true);
    this.stream1.unsubscribe();
  }

  createForm() {
    return this.fb.group({
      ID: '',
      Links: '',
      Intros: this.IntrosArray
    });
  }

  assignFormData(editFormData: any) {
    if(editFormData) {
      this.onReset();
      this.Form = this.qa.assign(this.Form, editFormData);
      
      const Intros = <any[]>JSON.parse(editFormData.Intros);
      Intros.forEach(intro => {
        this.addIntro(true, intro.Title, intro.Text,
                      intro.RouterLinks.join(', '),
                      intro.RouterLinksNames.join(', '),
                      intro.Image)
      });

      if(editFormData.Links){
        this.oldLinks = editFormData.Links;
      }
      this.stop$.next(true);
    }
  }

  processForm() {
    let Final = Object.assign({}, this.Form.value);
    Final.Links = [];
    Final.Intros = this.formatIntro(this.IntrosArray.value);

    let paths: string[] = [''];
    this.ImageEvents.forEach((event,i) => paths.push(`Intros/${i}`));
    const extend = paths.length - this.oldLinks.length;

    for(let i = 0; i < extend; i++){
      this.oldLinks.push('');
    }
   
    this.controller.activeFormData.next([Final,
                                         paths,
                                         this.ImageEvents,
                                         this.oldLinks,
                                         undefined,
                                         undefined,
                                         undefined]);
  }

  onReset() {
    this.ImageEvents = [''];
    this.IntrosArray = this.fb.array([]);
    this.Form = this.createForm();
  }

  addIntro(add: boolean, title: string = '', text: string = '',
            routerLinks: string = '', routerLinksNames: string = '',
            image: boolean = false) {
    if(add) {
      this.IntrosArray.push(
        this.fb.group({Title: title,
                       Text: text,
                       RouterLinks: routerLinks,
                       RouterLinksNames: routerLinksNames,
                       Image: image})
      );
      this.ImageEvents.push();
    } else {
      this.IntrosArray.removeAt(this.IntrosArray.value.length-1);
      this.ImageEvents.pop();
    }
  }

  onFile(event: any, index: number) {
    this.ImageEvents[index] = event;
  }

  formatIntro(intros: any) {
    const formattedIntros: Intro[] = []
    for(let intro of intros){
      intro.RouterLinks = intro.RouterLinks.split(', ');
      intro.RouterLinksNames = intro.RouterLinksNames.split(', ');
      formattedIntros.push(intro);
    }
    return JSON.stringify(formattedIntros);
  }
}

