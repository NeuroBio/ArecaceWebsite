import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/administration/security/Auth/auth.service';
import { TextProvider } from 'src/app/GlobalServices/textprovider.service';
import { SA } from 'src/app/Classes/SAclass';
import { CharacterMetaData } from 'src/app/Classes/charactermetadata';
import { Subscription, Observable } from 'rxjs';
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
  data: any; //= {
    //Characters: [new CharacterMetaData()],
    //SAs: [new SA()],
  //  Surveys: []
  //}
  authorized: boolean;

  stream1: Subscription;
  stream2: Subscription;
  stream3: Subscription;

  showAccountInfo = false;

  constructor(private auth: AuthService,
              private textprovider: TextProvider,
              private firebaseserv: FireBaseService) { }

  ngOnInit() {
    this.loggedoutText = this.textprovider.WebsiteText
    .find(member => member.ID =='login').Text;
    this.loggedinText = this.textprovider.WebsiteText
    .find(member => member.ID =='userdash').Text;
    
    this.stream1 = this.auth.user.subscribe(user => this.authorized = user? true : false);
    this.stream2 = this.auth.user.subscribe(user => this.user = user);
    //this.stream3 = this.firebaseserv.returnDocument(`Users/${this.auth.uid.value}`)
    this.stream3 = this.firebaseserv.returnDocument(`Users/${this.auth.uid.value}`)
       .subscribe(data => {this.data = data;console.log(data)});//{Characters: JSON.parse(data.Characters),
                                       //SAs: JSON.parse(data.SAs)})
    // this.stream3 = this.firebaseserv.returnCollect(`Users/${this.auth.uid.value}/Survey`)
    //                                    .subscribe(data => {console.log(data)})
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    //this.stream2.unsubscribe();
    this.stream3.unsubscribe();
  }

  setShowAccountInfo() {
    this.showAccountInfo = !this.showAccountInfo;
  }
}
