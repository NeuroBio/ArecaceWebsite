import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/administration/security/Auth/auth.service';
import { TextProvider } from 'src/app/GlobalServices/textprovider.service';
import { SA } from 'src/app/Classes/SAclass';
import { CharacterMetaData } from 'src/app/Classes/charactermetadata';
import { Subscription } from 'rxjs';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.css']
})
export class UserDashComponent implements OnInit, OnDestroy {

  loggedoutText: string;
  loggedinText: string;
  user = {ID: 10,
          email: "fake@fake.com",
          userName: "tester",
          Admin: false,
          User: true,
          Narrative: '',
          Script: '',
          Comic: '',
          }
  data = {
    Characters: [new CharacterMetaData],
    SAs: [new SA],
    Surveys: []
  }

  stream1: Subscription;
  stream2: Subscription;

  showAccountInfo = false;

  constructor(public auth: AuthService,
              private textprovider: TextProvider,
              private firebaseserv: FireBaseService) { }

  ngOnInit() {
    this.loggedoutText = this.textprovider.WebsiteText
    .find(member => member.ID =='login').Text;
    this.loggedinText = this.textprovider.WebsiteText
    .find(member => member.ID =='userdash').Text;
    // this.stream1 = this.auth.user.subscribe(user => this.user = user);
    // this.stream2 = this.firebaseserv.returnCollect(`Users/${this.auth.uid.value}/Data`)
    //   .subscribe(data => this.data = {Characters: JSON.parse(data.Characters),
    //                                   SAs: JSON.parse(data.SAs)})
  }

  ngOnDestroy() {
    // this.stream1.unsubscribe();
    // this.stream2.unsubscribe();
  }

  setShowAccountInfo() {
    this.showAccountInfo = !this.showAccountInfo;
  }
}
