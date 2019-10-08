import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/administration/security/Auth/auth.service';
import { TextProvider } from 'src/app/GlobalServices/textprovider.service';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.css']
})
export class UserDashComponent implements OnInit {

  mainText: string;
  user = {ID: 10,
          email: "fake@fake.com",
          userName: "tester",
          Admin: false,
          User: true
          }
  showAccountInfo = false;

  constructor(public auth: AuthService,
              private textprovider: TextProvider) { }

  ngOnInit() {
    this.mainText = this.textprovider.WebsiteText
    .find(member => member.ID =='login').Text;
  }

  setShowAccountInfo() {
    this.showAccountInfo = !this.showAccountInfo;
  }
}
