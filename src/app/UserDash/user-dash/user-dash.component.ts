import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/administration/security/Auth/auth.service';
import { TextProvider } from 'src/app/GlobalServices/textprovider.service';
import { User } from '../../Classes/user';
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
  user: User;
  names: [string[],string][];
  titles: string[];
  authorized: boolean;

  stream1: Subscription;

  showAccountInfo = false;

  constructor(private auth: AuthService,
              private textprovider: TextProvider) { }

  ngOnInit() {
    this.loggedoutText = this.textprovider.WebsiteText
    .find(member => member.ID =='login').Text;
    this.loggedinText = this.textprovider.WebsiteText
    .find(member => member.ID =='userdash').Text;
    
    this.stream1 = this.auth.user.subscribe(user => {
      this.authorized = user? true : false;
      this.user = user;
      this.PrepareData();
    });
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
  }

  setShowAccountInfo() {
    this.showAccountInfo = !this.showAccountInfo;
  }

  PrepareData(){
    this.names = [];
    if(this.user.Characters) {
      this.names.push([this.user.Characters.map(char => `${char.FirstName} ${char.LastName}`),
      'Your Fan Characters']);
    }
    if(this.user.SAcalcs) {
      this.names.push([this.user.SAcalcs.map(SA => SA.ID),
        'Your Source Affinity Data']);
    }
    if(this.user.Surveys) {
      this.names.push([this.user.Surveys.map(survey => `${survey.Name} (${survey.UploadTime})`),
      'Your Survey Data']);
    }
  }
}
