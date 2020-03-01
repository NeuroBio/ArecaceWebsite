import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/administration/security/Auth/auth.service';
import { TextProvider } from 'src/app/GlobalServices/textprovider.service';
import { User, SA, CharacterMetaData } from 'src/app/Classes/ContentClasses';
import { Subscription, Observable } from 'rxjs';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.css']
})
export class UserDashComponent implements OnInit, OnDestroy {

  loggedoutText: string;
  loggedinText: string;
  user: User;
  savedData: any[];
  titles: string[];
  authorized: boolean;

  stream1: Subscription;

  showAccountInfo = false;

  constructor(private auth: AuthService,
              private textprovider: TextProvider,
              private userdataser: UserDataService) { }

  ngOnInit() {
    this.loggedoutText = this.textprovider.WebsiteText
    .find(member => member.ID =='login').Text;
    this.loggedinText = this.textprovider.WebsiteText
    .find(member => member.ID =='userdash').Text;
    
    this.stream1 = this.auth.user.subscribe(user => {
      this.authorized = user? true : false;
      this.user = user;
      this.PrepareData();
      this.userdataser.assignUserData(user);
    });
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
  }

  setShowAccountInfo() {
    this.showAccountInfo = !this.showAccountInfo;
  }

  PrepareData(){
    this.savedData = [];
    if(this.user.FanCharacters) {
      this.savedData.push({
        title: 'Your Fan Characters',
        link: 'fancharacters',
        name: this.user.FanCharacters.map(char => char.DisplayName),
        type: 'FanCharacters',
        data: this.user.FanCharacters,
        edit: true
     });
    }
    if(this.user.SAcalculations) {
      this.savedData.push({
        title: 'Your Source Affinity Data',
        link: 'sacalculations',
        name: this.user.SAcalculations.map(sa =>
          sa.DisplayName.split('-').join(' ')),
        type: 'SAcalculations',
        data: this.user.SAcalculations,
        edit: true
        });
    }
    if(this.user.SurveyResults) {
      this.savedData.push({
      title: 'Your Survey Data',
      link: 'surveyresults',
      name: this.user.SurveyResults.map(survey => survey.DisplayName),
      type: 'SurveyResults',
      data: this.user.SurveyResults,
      edit: false
    });
    }
  }
}
