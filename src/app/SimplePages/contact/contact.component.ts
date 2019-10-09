import { Component, OnInit }        from '@angular/core';
import { FormBuilder, Validators }  from '@angular/forms';

import { messageValidator }         from './Validate';
import { ContactService }           from './contact.service';
import { AuthService } from 'src/app/administration/security/Auth/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {

  contactForm = this.createForm();
  ready: boolean;
  timeOut: any;
  reasons: string[] = ["I'm a bot :)",
                      "Use of my work or attribution",
                      "Website/Accessibility issue",
                      "Question/Comment about Arecace",
                      "I want to tell you about my story!",
                      "I found a typo",
                      "Other"];
  message: string;
  active: boolean = false;
  dropdownInfo: string;
  tempDisable: boolean = false;

  ReasonInvalid: boolean = false;
  NameInvalid: boolean = false;
  EmailInvalid: boolean = false;
  MessageInvalid: boolean = false;

  constructor(private fb: FormBuilder,
              private contactserv: ContactService,
              private auth: AuthService) { }

  ngOnInit() {
    window.scroll(0,0);
    this.resetTimer();
    if(!this.auth.isLoggedIn) {
      this.auth.anonymousLogin();
    }
  }

  createForm(){
    return this.fb.group({
      Reason: ['', Validators.required],
      FirstName: ['', Validators.required],
      Email: ['', [Validators.required,
                  Validators.email]],
      Message: ['', [Validators.required,
                    Validators.minLength(100),
                    Validators.maxLength(5500),
                    messageValidator()]],
      //honey
      LastName: '',
      Phone: '',
      Reply: ''
    });
  }

  retrieveInfo(){
    const reason:string = this.contactForm.controls.Reason.value
    if(reason === "Use of my work or attribution"){
      this.dropdownInfo = "Make sure you have read list items 4-7 in the FAQ!  There's a link in the footer.";
      this.tempDisable = false;
    }else if(reason === "I want to tell you about my story!"){
      this.dropdownInfo = "Your enthusiasm for story craft is awesome, but this isn't the place for that.  Please wait until I have the playground set up!";
      this.tempDisable = true;
    }else{
      this.dropdownInfo = undefined;
      this.tempDisable = false;
    }
  }

  resetTimer(){
    this.ready = false;
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.ready=true;
      this.message=undefined;
    }, 5000);
  }

  onSubmit(){
    this.resetErrors();
    this.active = true;
    if(this.ready){
      const form = Object.assign({}, this.contactForm.value);
      
      if(this.checkHuman(form)){
        if(form.Reason !== "I'm a bot :)"){
          if(this.contactForm.valid){
            const reasonIndex = this.reasons.findIndex(rea => rea === form.Reason);
            this.contactserv.PushMessage(form, reasonIndex).then(() => this.message = "Submitted!");
          }else{
            this.findError();
          }
        }else{
          this.botPost();
        }
      }else{
        this.sayPosted();
      }
    }else{
      this.fastPost();
    }

  }

  checkHuman(form:any){
    let human = true;
    if(form.LastName || form.Phone || form.Reply){
        human = false;
    }
    return human;
  }

  resetButton(message:string, reset:boolean){
    setTimeout(() => {
      this.active = false;
      this.message = message;
    }, 1000)
  }
 
  fastPost(){
    setTimeout(() => {
      this.active = false;
      this.message = "You are posting too quickly!";
      this.resetTimer();
    }, 1000)
  }

  sayPosted(){
    setTimeout(() => {
      this.message = "Submitted!";
    }, 1000)
  }

  botPost(){
    setTimeout(() => {
      this.message = "Haha, very funny.";
    }, 1000)
  }

  findError(){
    setTimeout(() => {
      if(!this.contactForm.controls.Reason.valid){
        this.ReasonInvalid = true
      }
      if(!this.contactForm.controls.FirstName.valid){
        this.NameInvalid = true
      }
      if(!this.contactForm.controls.Email.valid){
        this.EmailInvalid = true
      }
      if(!this.contactForm.controls.Message.valid){
        this.MessageInvalid = true
      }
      this.active = false;
      this.message = "There is an error in the form!"
    }, 1000)
  }

  resetErrors(){
    this.ReasonInvalid = false;
    this.NameInvalid = false;
    this.EmailInvalid = false;
    this.MessageInvalid = false;
  }

}
