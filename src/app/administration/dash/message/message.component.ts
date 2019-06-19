import { Component, OnInit } from '@angular/core';

import { CRUD } from '../../CRUD.service';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {
  classes: string[] = ["Use", "Issue", "QorC", "Typo", "Other"];
  NewMessages: any[][];
  OldMessages: any[][];
  Messages: any[][];
  currentReason: number;
  messageBank: any[];
  currentMessage: number;
  readMessage: any;
  noSave: boolean;

  constructor(private messageserv: MessageService,
              private uploadserv: CRUD) { }

  ngOnInit() {
    this.messageserv.getNewMessages().subscribe(mess =>{
        let final:string[][] = [];
        for(let cat of this.classes){
          final.push(mess.filter(mess => mess.Reason === cat));
        }
        this.NewMessages = final;
        this.Messages = this.NewMessages;
      });

      this.messageserv.getOldMessages().subscribe(mess =>{
          let final:string[][] = [];
          for(let cat of this.classes){
            final.push(mess.filter(mess => mess.Reason === cat));
          }
          this.OldMessages = final; 
      });
  }

  fetchMessages(classInd: number){
    this.currentReason = classInd;
    this.messageBank = this.Messages[classInd];
    this.currentMessage = undefined;
    this.readMessage = undefined;
  }

  openMessage(index: number){
    this.currentMessage = index;
    this.readMessage = this.messageBank[index];
  }

  onDelete(){
    if(!this.readMessage.key){
      console.log("You only just moved this.  There is no key. :<")
    }else{
      let location:string;
      if(this.noSave){
        location = 'ContactSaved';
      }else{
        location = 'Contact';
      }

      return this.uploadserv.deleteItem([], location, this.readMessage.key)
      .then(() => {
        this.onReset(false)});
    }   
  }

  onSave(){
    const moveDoc = {Email: this.readMessage.Email,
                      Name: this.readMessage.Name,
                      Date: this.readMessage.Date,
                      Message: this.readMessage.Message,
                      Reason: this.readMessage.Reason}
    return this.uploadserv.uploadItem(moveDoc,'ContactSaved')
    .then(() => {return this.uploadserv.deleteItem([], 'Contact', this.readMessage.key)
    }).then(() => {
      this.onReset(true)});
  }

  getSaved(save:boolean){
    if(save){
      this.Messages = this.OldMessages;
      this.noSave = true;
    }else{
      this.Messages = this.NewMessages;
      this.noSave = false;
    }
    this.currentReason  = undefined;
    this.messageBank = undefined;
    this.currentMessage = undefined;
    this.readMessage = undefined;
  }

  onReset(save:boolean){
    if(save){
      this.NewMessages[this.currentReason].splice(this.readMessage, 1);
      delete this.readMessage.key;
      this.OldMessages[this.currentReason].push(this.readMessage);
    }else{
      if(this.noSave){
        this.OldMessages[this.currentReason].splice(this.readMessage, 1);
      }else{
        this.NewMessages[this.currentReason].splice(this.readMessage, 1);
      }
    }
    this.currentMessage = undefined;
    this.readMessage = undefined;
  }
}
