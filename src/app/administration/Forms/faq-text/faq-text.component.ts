import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { CRUDcontrollerService } from '../../services/CRUDcontroller.service';
import { takeUntil } from 'rxjs/operators';
import { Question } from 'src/app/Classes/faq';

@Component({
  selector: 'app-faq-text',
  templateUrl: './faq-text.component.html',
  styleUrls: ['../Form.css']
})
export class FaqTextComponent implements OnInit, OnDestroy {

  Form = this.createForm();
  stream1 = new Subscription();
  stop$ = new Subject<boolean>();
  QuestionsArray = this.fb.array([]);

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
    this.stop$.next(true)
    this.stream1.unsubscribe();
  }

  createForm() {
    return this.fb.group({
      ID: '',
      Questions: this.QuestionsArray
    });
  }

  assignFormData(editFormData: any) {
    if(editFormData) {
      this.onReset();
      this.QuestionsArray;
      const Questions = <Question[]>JSON.parse(editFormData.Questions);
      Questions.forEach(question => {this.addQuestion(
        true, question.Question, question.Answer, question.RouterLink
      )});
      this.stop$.next(true);
    }
  }

  processForm() {
    const Final = Object.assign({}, this.Form.value);
    Final.Questions = JSON.stringify(Final.Questions);
    this.controller.activeFormData.next([Final,
                                         [],
                                         [],
                                         [],
                                         undefined,
                                         undefined,
                                         undefined]);
  }

  onReset() {
    this.QuestionsArray = this.fb.array([]);
    this.Form = this.createForm();
  }


  addQuestion(add: boolean, question: string = '',
              answer: string = '', routerLink: string = '') {
    if(add){
      this.QuestionsArray.push(this.fb.group({
                                  Question: question,
                                  Answer: answer,
                                  RouterLink: routerLink})
      );
    }else{
      this.QuestionsArray.removeAt(this.QuestionsArray.value.length-1);
    }
  }
}