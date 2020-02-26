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
    if(this.user.Characters) {
      this.savedData.push({
        title: 'Your Fan Characters',
        link: 'char',
        name: this.user.Characters.map(char => `${char.FirstName} ${char.LastName}`)
     });
    }
    if(this.user.SAcalcs) {
      this.savedData.push({
        title: 'Your Source Affinity Data',
        link: 'sa',
        name: this.user.SAcalcs.map(SA => SA.ID)
        });
    }
    if(this.user.Surveys) {
      this.savedData.push({
      title: 'Your Survey Data',
      link: 'survey',
      name: this.user.Surveys.map(survey => `${survey.Name} (${survey.UploadTime})`)
    });
    }
  }
}
